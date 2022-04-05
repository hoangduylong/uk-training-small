package nts.uk.shr.sample.diag;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

import lombok.SneakyThrows;
import lombok.val;

public class ClassFinder {
    private ClassLoader classLoader;
    
    public ClassFinder() {
        classLoader = Thread.currentThread().getContextClassLoader();
    }

    public ClassFinder(ClassLoader classLoader) {
        this.classLoader = classLoader;
    }

    public void printClasses(String rootPackageName) throws Exception {
        String resourceName = rootPackageName.replace('.', '/');
        URL url = classLoader.getResource(resourceName);
        System.out.println("URL = " + url);
        System.out.println("URLConnection = " + url.openConnection());
    }

    private String fileNameToClassName(String name) {
        return name.substring(0, name.length() - ".class".length());
    }

    private String resourceNameToClassName(String resourceName) {
        return fileNameToClassName(resourceName).replace('/', '.');
    }

    private boolean isClassFile(String fileName) {
        return fileName.endsWith(".class");
    }

    private String packageNameToResourceName(String packageName) {
        return packageName.replace('.', '/');
    }

    @SneakyThrows
    public List<Class<?>> findClasses(String rootPackageName) {
        String resourceName = packageNameToResourceName(rootPackageName);
        URL url = classLoader.getResource(resourceName);

        if (url == null) {
            return new ArrayList<Class<?>>();
        }
        
        val file = new File(url.getFile());
        if (file.isDirectory()) {
            return findClassesWithFile(rootPackageName, file);
        } else {
            return findClassesWithJarFile(rootPackageName, url.getFile());
        }

    }

    private List<Class<?>> findClassesWithFile(String packageName, File dir) throws Exception {
        List<Class<?>> classes = new ArrayList<Class<?>>();

        if (dir.list() == null)
        	return classes;
        
        for (String path : dir.list()) {
            File entry = new File(dir, path);
            if (entry.isFile() && isClassFile(entry.getName())) {
                classes.add(classLoader.loadClass(packageName + "." + fileNameToClassName(entry.getName())));
            } else if (entry.isDirectory()) {
                classes.addAll(findClassesWithFile(packageName + "." + entry.getName(), entry));
            }
        }

        return classes;
    }

    private List<Class<?>> findClassesWithJarFile(String rootPackageName, String path) throws Exception {
        List<Class<?>> classes = new ArrayList<Class<?>>();

        int index = path.indexOf(".jar");
        String jarPath = path.substring(0, index + 4);
        
        JarFile jarFile = null;

        try {
            jarFile = new JarFile(jarPath);
            Enumeration<JarEntry> jarEnum = jarFile.entries();

            String packageNameAsResourceName = packageNameToResourceName(rootPackageName);

            while (jarEnum.hasMoreElements()) {
                JarEntry jarEntry = jarEnum.nextElement();
                if (jarEntry.getName().startsWith(packageNameAsResourceName) && isClassFile(jarEntry.getName())) {
                    classes.add(classLoader.loadClass(resourceNameToClassName(jarEntry.getName())));
                }
            }
        } finally {
            if (jarFile != null) {
                jarFile.close();
            }
        }

        return classes;
    }
}