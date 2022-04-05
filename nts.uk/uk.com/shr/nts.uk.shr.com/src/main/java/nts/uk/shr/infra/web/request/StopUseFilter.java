package nts.uk.shr.infra.web.request;

import java.io.IOException;
import java.util.Optional;

import javax.enterprise.inject.spi.CDI;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.val;
import nts.uk.shr.com.operation.SystemOperationSettingAdapter;
import nts.uk.shr.com.program.nosession.PathsNoSession;
import nts.uk.shr.infra.web.ScreenPath;

public class StopUseFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		val httpRequest = (HttpServletRequest) request;

		// if it don't required session => next
		if (isNotSessionRequired(httpRequest)) {
			chain.doFilter(request, response);
			return;
		}
		
		// check stop-use state
		Optional<String> error = CDI.current().select(SystemOperationSettingAdapter.class).get().stopUseConfirm();
		if (error.isPresent()) {
			
			// if true, move to stop-use screen
			val httpResponse = (HttpServletResponse) response;
			try {
				if (isWebApi(httpRequest)) {
					buildResponseError(httpResponse);
				} else {
					httpResponse.sendRedirect(ScreenPath.basedOn(request).error().stopUse());
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			return;
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}

	private boolean isNotSessionRequired(HttpServletRequest httpRequest) {
		return !PathsNoSession.WEB_SCREENS.sessionRequired(httpRequest.getServletPath())
				|| !PathsNoSession.WEB_APIS.sessionRequired(httpRequest.getPathInfo());
	}

	private boolean isWebApi(HttpServletRequest httpRequest) {
		return httpRequest.getServletPath().contains("webapi");
	}

	private void buildResponseError(HttpServletResponse httpResponse) throws IOException {
		httpResponse.setContentType("application/json;charset=UTF-8");
		httpResponse.setStatus(403);
	}

}
