package nts.uk.shr.infra.web;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

public class ScreenPath {

	private final HttpServletRequest request;
	private final Errors errors;
	
	private ScreenPath(HttpServletRequest request) {
		this.request = request;
		this.errors = new Errors();
	}
	
	public static ScreenPath basedOn(ServletRequest request) {
		return new ScreenPath((HttpServletRequest) request);
	}
	
	public Errors error() {
		return this.errors;
	}
	
	public String comweb() {
		String contextPath = request.getContextPath();
		String rootPath = contextPath.substring(0, contextPath.lastIndexOf("/") + 1);
		return rootPath + "nts.uk.com.web";
	}
	
	public class Errors {
		
		public String sessionTimeout() {
			return comweb() + "/view/common/error/sessiontimeout/index.xhtml";
		}
		
		public String stopUse() {
			return comweb() + "/view/common/error/stopuse/index.xhtml";
		}
		
		public String system() {
			return comweb() + "/view/common/error/system/index.xhtml";
		}
	}
}
