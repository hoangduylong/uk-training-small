package nts.uk.shr.infra.web;

import javax.enterprise.inject.spi.CDI;
import javax.servlet.http.HttpServletRequest;

public class ResourceLocation {
	
	private final String contextPath;
	
	public ResourceLocation() {
		this.contextPath = CDI.current().select(HttpServletRequest.class).get().getContextPath();
	}

	public String absolutePathTo(String pathToTarget) {
		return contextPath + pathToTarget;
	}
}
