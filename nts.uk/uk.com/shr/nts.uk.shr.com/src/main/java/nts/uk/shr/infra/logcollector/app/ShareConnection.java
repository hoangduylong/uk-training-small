package nts.uk.shr.infra.logcollector.app;

import java.io.IOException;

import jcifs.smb.SmbFile;
import nts.gul.security.crypt.commonkey.CommonKeyCrypt;
import nts.uk.shr.infra.logcollector.dom.LogAccessInfo;

public class ShareConnection {
	
	/**
	 * Get SmbFile.
	 * @param info log access info
	 * @return SmbFile
	 */
	public static SmbFile getSmbFile(LogAccessInfo info) {
		try {
			return new SmbFile(getConnectionString(info));
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}
	
	/**
	 * Get connection string.
	 * @param info log access info
	 * @return connection string
	 */
	public static String getConnectionString(LogAccessInfo info) {
		StringBuilder connStr = new StringBuilder();
		connStr.append("smb://").append(info.getDomain());
		info.getUserName().ifPresent(u -> {
			connStr.append(";" + u);
		});
		
		info.getPassword().map(p -> CommonKeyCrypt.decrypt(p)).ifPresent(p -> { 
			connStr.append(":" + p);
		});
		
		connStr.append("@" + info.getHost());
		info.getLocation().ifPresent(l -> {
			if (l.charAt(0) == '/') {
				connStr.append(l);
			} else {
				connStr.append("/" + l);
			}
		});
		connStr.append("/server.log");
		return connStr.toString();
	}
}