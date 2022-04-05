package nts.uk.shr.com.context;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

import lombok.Value;
import nts.gul.misc.DeepClonable;

@Value
public class RequestInfo implements DeepClonable<RequestInfo>, Serializable {
	/****/
	private static final long serialVersionUID = 1L;
	
	private String fullRequestPath;
	
	private String webApi;
	
	private String requestIpAddress;
	
	private String requestPcName;
	
	public ScreenIdentifier getScreenIdentifier() {
		return ScreenIdentifier.create(fullRequestPath);
	}
	
	public String getHostApi(){
		return StringUtils.join(fullRequestPath.split(webApi)[0], webApi, "/"); 
	}

	@Override
	public RequestInfo deepClone() {
		return new RequestInfo(fullRequestPath, webApi, requestIpAddress, requestPcName);
	}
}
