package nts.uk.shr.com.context;

import nts.arc.scoped.request.RequestContextProvider;
import nts.arc.scoped.session.SessionContextProvider;
import nts.uk.shr.infra.application.auth.WindowsAccount;

public class AppContextsConfig {
	
	public static final String KEY_PROGRAM_ID = "programId";
	
	public static final String REQUEST_WEBAPI = "requestedWebAPI";
	
	public static final String BEFORE_REQUEST_WEBAPI = "beforeRequestedWebAPI";
	
	public static final String WINS_ACCOUNT = "windowsAccount";
	
	public static final String DEVICE_INFO = "deviceInfo";

	public static void setProgramId(String programId) {
		RequestContextProvider.get().put(KEY_PROGRAM_ID, programId);
	}
	
	public static void setRequestedWebAPI(RequestInfo webApi) {
		RequestContextProvider.get().put(REQUEST_WEBAPI, webApi);
	}
	
	public static void setBeforeRequestedWebAPI(RequestInfo webApi) {
		RequestContextProvider.get().put(BEFORE_REQUEST_WEBAPI, webApi);
	}
	
	public static void setWindowsAccount(WindowsAccount account) {
		SessionContextProvider.get().put(WINS_ACCOUNT, account);
	}
	
	public static void setDeviceInfo(DeviceInfo info) {
		RequestContextProvider.get().put(DEVICE_INFO, info);
	}
}
