package nts.uk.shr.infra.web.session;

import java.io.IOException;

import javax.enterprise.inject.spi.CDI;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import nts.uk.shr.com.communicate.batch.BatchServer;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager;

public class BatchRequestProcessor implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String userContextBase64 = httpRequest.getHeader(BatchServer.CUSTOM_HEADER_USER_CONTEXT);

		CDI.current().select(LoginUserContextManager.class).get().restoreBase64(userContextBase64);
		chain.doFilter(httpRequest, response);
	}

	@Override
	public void destroy() {
	}

}