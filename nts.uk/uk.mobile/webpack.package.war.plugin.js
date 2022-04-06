const fs = require('fs'),
    path = require('path'),
    ZipZip = require('zipzip');

function PackageWarFile(env) {
    this.env = env || {};
}

PackageWarFile.prototype.apply = function (compiler) {
    let self = this;

    compiler.hooks.done.tap('PackageWarFile', function () {
        if (self.env.prod) {
            // create ZipZip instance
            const zip = new ZipZip(path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web.war')),
                idf = path.join(__dirname, 'wwwroot', 'index.html'),
                vdm = path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist', 'vendor.js.map'),
                bdm = path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist', 'bundles.js.map'),
                vdcm = path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist', 'vendor.css.map'),
                bdcm = path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist', 'bundles.css.map'),
                vmnf = path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist', 'vendor-manifest.json');

            // delete map file
            if (fs.existsSync(vdm)) { fs.unlinkSync(vdm); }
            if (fs.existsSync(bdm)) { fs.unlinkSync(bdm); }

            if (fs.existsSync(vdcm)) { fs.unlinkSync(vdcm); }
            if (fs.existsSync(bdcm)) { fs.unlinkSync(bdcm); }

            if (fs.existsSync(vmnf)) { fs.unlinkSync(vmnf); }

            // change version of resource
            const content = fs.readFileSync(idf, { encoding: 'utf-8' });
            fs.writeFileSync(idf, content.replace(/\?v=\d{13}/g, `?v=${new Date().getTime()}`), { encoding: 'utf-8' });

            // add a directory with different target
            zip.addDirectory(path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist'), '/dist');

            // add a custom file
            zip.addFile(idf);
            zip.addFile(path.join(__dirname, 'ClientApp', 'web.xml'), '/WEB-INF/web.xml');

            zip.build().then(() => {
                console.log('\n');
                console.log('   +--------------------------------------------------------------+');
                console.log('   | War file [nts.uk.mobile.web.war] has been created at wwwroot |');
                console.log('   +--------------------------------------------------------------+');
                console.log('\n');
            });
        }
    });
};

module.exports = PackageWarFile;