package nts.uk.shr.infra.web.request;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.HttpMethod;

import lombok.val;
import nts.arc.system.ServerSystemProperties;

/**
 * Cross-Origin Resource Sharing
 */
public class CorsPreflightFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		val httpRequest = (HttpServletRequest) request;
		
		// webapi "/public" is shared for cross-origin
		if (acceptsCrossOrigin(httpRequest)) {
			
			val httpResponse =(HttpServletResponse) response;
			httpResponse.addHeader("Access-Control-Allow-Origin", "*");
			httpResponse.addHeader("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
			httpResponse.addHeader("Access-Control-Allow-Credentials", "true");
			httpResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
			
			// preflight by OPTIONS
			if (httpRequest.getMethod().equals(HttpMethod.OPTIONS)) {
				return;
			}
		} else if (httpRequest.getHeader("origin") != null) {
			/** TODO: this code just for DEV mode, when deploy mobile in same wildfly with other web pack, need to remove this */
			val httpResponse =(HttpServletResponse) response;
			
			httpResponse.addHeader("Access-Control-Allow-Origin", httpRequest.getHeader("origin"));
			
			httpResponse.addHeader("Access-Control-Allow-Headers", "X-Requested-With, origin, content-type, accept, authorization, PG-Path, X-CSRF-TOKEN, MOBILE");
			httpResponse.addHeader("Access-Control-Allow-Credentials", "true");
			httpResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
			
			if (httpRequest.getMethod().equals(HttpMethod.OPTIONS)) {
				httpResponse.setStatus(HttpServletResponse.SC_ACCEPTED);
				return;
			}
		}
		
		chain.doFilter(httpRequest, response);
	}
	
	private static boolean acceptsCrossOrigin(HttpServletRequest request) {
		
		String path = request.getPathInfo();
		
		if (path == null) {
			return false;
		}
		
		if (path.indexOf("/public") == 0) {
			return true;
		}
		
		if (path.indexOf("/develop") == 0 && ServerSystemProperties.isDebugMode()) {
			return true;
		}
		
		return false;
	}

	@Override
	public void destroy() {
		
	}

}
