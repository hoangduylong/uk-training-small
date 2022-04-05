package nts.uk.shr.com.communicate;

import lombok.Getter;
import nts.uk.shr.infra.web.WebApiSetting;

@Getter
public class PathToWebApi {

	private final App app;
	private final String path;
	
	private PathToWebApi(App app, String path) {
		this.app = app;
		
		if (path.charAt(0) != '/') {
			path = "/" + path;
		}
		this.path = path;
	}
	
	public static PathToWebApi com(String path) {
		return new PathToWebApi(App.COM, path);
	}
	
	public static PathToWebApi at(String path) {
		return new PathToWebApi(App.AT, path);
	}
	
	public String createPath() {
		return this.app.contextName() + WebApiSetting.ROOT_PATH + this.path;
	}
	
	public static enum App {
		COM,
		AT,
		;
		public String contextName() {
			switch (this) {
			case COM:
				return "nts.uk.com.web";
			case AT:
				return "nts.uk.at.web";
			default:
				throw new RuntimeException("unknown: " + this);
			}
		}
	}
}
