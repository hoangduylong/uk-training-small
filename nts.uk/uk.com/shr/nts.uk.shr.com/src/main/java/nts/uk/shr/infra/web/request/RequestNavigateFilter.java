package nts.uk.shr.infra.web.request;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.SneakyThrows;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.AppContextsConfig;
import nts.uk.shr.com.context.DeviceInfo;
import nts.uk.shr.com.program.Program;
import nts.uk.shr.com.program.ProgramsManager;
import nts.uk.shr.com.program.WebAppId;
import nts.uk.shr.infra.web.util.FilterConst;
import nts.uk.shr.infra.web.util.FilterHelper;

public class RequestNavigateFilter implements Filter {
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		Optional<String> pido = FilterHelper.detectProgram(getRequestPath(httpRequest));
		if(pido.isPresent()) {
			Program requestProgram = ProgramsManager.findById(pido.get()).get();
			DeviceInfo deviceInfo = AppContexts.deviceInfo();
			if(deviceInfo == null) {
				deviceInfo = DeviceInfo.detectDevice(httpRequest).get();
				AppContextsConfig.setDeviceInfo(deviceInfo);
			}
			String mobiContext = FilterConst.webApps.get(WebAppId.MOBI);
			if(deviceInfo.isMobile()){
				if(!httpRequest.getContextPath().contains(mobiContext)) {
					if(requestProgram.getRelativePid() == null){
						/** TODO: redirect to not found page */
						return;
					}
					Optional<Program> programOpt = ProgramsManager.findById(WebAppId.MOBI, requestProgram.getRelativePid());
					if(programOpt.isPresent()){
						/** TODO: check for develop (remove on after) */
						if(httpRequest.getHeader("host").contains("localhost")){
							redirectPage(response, "http://localhost:3000" + buildPagePathToRedirect(httpRequest, mobiContext, programOpt.get()));
							return;
						}
						redirectPage(httpRequest, response, 
								buildPagePathToRedirect(httpRequest, mobiContext, programOpt.get()));
						return;
					} else {
						/** TODO: redirect to not found page */
						return;
					}
				}
			} else if (deviceInfo.isPc()) {
				if(httpRequest.getContextPath().contains(mobiContext)) {
					if(requestProgram.getRelativePid() == null){
						/** TODO: redirect to not found page */
						return;
					}
					Optional<Program> programOpt = ProgramsManager.findById(requestProgram.getRelativePid());
					if(programOpt.isPresent()){
						redirectPage(httpRequest, response, 
								buildPagePathToRedirect(httpRequest, FilterConst.webApps.get(programOpt.get().getAppId()), programOpt.get()));
						return;
					} else {
						/** TODO: redirect to not found page */
						return;
					}
				}
			}
		}
		
		chain.doFilter(request, response);
	}

	private String getRequestPath(HttpServletRequest httpRequest) {
		return httpRequest.getContextPath() + httpRequest.getServletPath();
	}
	
	private String getQueryParam(HttpServletRequest httpRequest) {
		return httpRequest.getQueryString() == null ? "" : "?" + httpRequest.getQueryString();
	}

	private String buildPagePathToRedirect(HttpServletRequest request, String mobiContext, Program program) {
		return "/" + mobiContext + program.getPPath() + getQueryParam(request);
	}

	@SneakyThrows
	/**: redirect by program */
	private void redirectPage(ServletRequest request, ServletResponse response, String path) {
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		httpResponse.sendRedirect(path);
		request.getRequestDispatcher(path).forward(request, response);
	}
	
	@SneakyThrows
	/**: redirect by program */
	private void redirectPage(ServletResponse response, String path) {
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		httpResponse.sendRedirect(path);
	}

	@Override
	public void destroy() {
	}

}
