package nts.uk.shr.infra.web.util;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import nts.uk.shr.com.context.ScreenIdentifier;
import nts.uk.shr.com.program.Program;
import nts.uk.shr.com.program.ProgramsManager;
import nts.uk.shr.com.program.WebAppId;

public class FilterHelper {
	
	public static List<Program> LOGIN_PATH = Arrays.asList(
			ProgramsManager.CCG007A,
			ProgramsManager.CCG007B,
			ProgramsManager.CCG007C,
			ProgramsManager.CCG007D,
			ProgramsManager.CCG007E,
			ProgramsManager.CCG007F,
			ProgramsManager.CCG007G,
			ProgramsManager.CCG007H,
			ProgramsManager.CCG007I
			);
	
	public static boolean isLoginPage(String requestPath){
		return LOGIN_PATH.stream().anyMatch(lg -> {
			return requestPath.contains(lg.getPPath());
		});
	}
	
	public static boolean isLoginPage(ScreenIdentifier target){
		String pgID = target.getProgramId() + target.getScreenId();
		return LOGIN_PATH.stream().anyMatch(lg -> {
			return pgID.equals(lg.getPId());
		});
	}

	public static Optional<String> detectProgram(String requestPath){
		Iterator<Entry<WebAppId, String>> iterator = FilterConst.webApps.entrySet().iterator();
		Entry<WebAppId, String> entry = null;
		int startIndex = -1, endIndex = requestPath.lastIndexOf("?");
		String partialPath = null;
		WebAppId appId = null;

		while (iterator.hasNext()) {
			entry = iterator.next();
			startIndex = requestPath.indexOf(entry.getValue());
			if (startIndex != -1) {
				startIndex += entry.getValue().length();
				partialPath = endIndex == -1 ? requestPath.substring(startIndex)
						: requestPath.substring(startIndex, endIndex);
				appId = entry.getKey();
				break;
			}
		}
		return ProgramsManager.idOf(appId, partialPath);
	}
	
	public static String detectWebapi(String requestPath){
		Iterator<Entry<WebAppId, String>> iterator = FilterConst.webApps.entrySet().iterator();
		Entry<WebAppId, String> entry = null;
		int startIndex = -1;

		while (iterator.hasNext()) {
			entry = iterator.next();
			startIndex = requestPath.indexOf(entry.getValue());
			if (startIndex != -1) {
				startIndex += entry.getValue().length();
				break;
			}
		}
		return entry.getValue();
	}
	
	/** get request ip address */
	public static String getClientIp(HttpServletRequest request) {
		
		if (request == null) {
			return "";
		}
		
		String remoteAddr = request.getHeader("X-FORWARDED-FOR");
		if (remoteAddr != null) {
			return remoteAddr;
		}
		
		// getRemoteAddr() returns 127.0.0.1 when client connects local server
		// but the case is develop-time only.
		return request.getRemoteAddr();
	}

	/** get request pc name */
	public static String getPcName(String ip) {
		/*if (StringUtil.isNullOrEmpty(ip, true)) {
			return "";
		}
		try {
			if (ip.equals(InetAddress.getLoopbackAddress().getHostAddress())) {
				return InetAddress.getLocalHost().getHostName();
			}
			InetAddress host = InetAddress.getByName(ip);
			return host.getHostName();
		} catch (UnknownHostException ex) {
			ex.printStackTrace();
		}*/
		return "";
	}
}
