package nts.uk.shr.com.context;

import java.io.Serializable;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.gul.misc.DeepClonable;

@Getter
@AllArgsConstructor
public class DeviceInfo implements DeepClonable<DeviceInfo>, Serializable {
	
	/***/
	private static final long serialVersionUID = 1L;

	private boolean pc;

	private boolean mobile;
	
	private boolean tablet;
	
	private boolean smartPhone;

	@Override
	public DeviceInfo deepClone() {
		return new DeviceInfo(pc, mobile, tablet, smartPhone);
	}
	
	public static Optional<DeviceInfo> detectDevice(HttpServletRequest request) {
		String userAgent = request.getHeader("User-Agent").toLowerCase();
		boolean isMobile = userAgent.indexOf("mobi") >= 0, 
				isAndroid = userAgent.indexOf("android") >= 0, 
				isIpod = userAgent.indexOf("ipod") >= 0, 
				isIpad = userAgent.indexOf("ipad") >= 0, 
				isIphone = userAgent.indexOf("iphone") >= 0 && !isIpod && !isIpad, 
				isAndroidPhone = isAndroid && isMobile, 
				isAndroidTablet = isAndroid && !isMobile;
		return Optional.of(new DeviceInfo(!isMobile && !isAndroidTablet, isMobile, isAndroidTablet || isIpad, isAndroidPhone || isIphone));
	}
}
