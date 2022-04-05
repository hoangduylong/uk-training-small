package nts.uk.shr.infra.web.session;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import nts.uk.shr.com.program.nosession.PathsNoSession;

public class WebApiLoginSessionValidator implements Filter {

	private static final ServletPathsNoSession PATHS_NO_SESSION = new ServletPathsNoSession(
			PathsNoSession.WEB_APIS,
			r -> r.getPathInfo());
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		if (!PATHS_NO_SESSION.validate(request)) {
			this.buildResponseError((HttpServletResponse) response);
            return;
		}
		
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}

	protected void buildResponseError(HttpServletResponse httpResponse) throws IOException {
		
		httpResponse.setContentType("application/json;charset=UTF-8");
		httpResponse.setStatus(401);
		PrintWriter writer = httpResponse.getWriter();
		writer.append("{ \"sessionTimeout\": true }");
	}
}
