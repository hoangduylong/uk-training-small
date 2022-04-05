package nts.uk.shr.com.security.ipaddress;

import java.io.IOException;

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
import nts.gul.web.HttpClientIpAddress;
import nts.uk.shr.com.net.Ipv4Address;

public class IpAddressRestrictor implements Filter {
	
	private ValidateIpAddressService validateIpAddressService;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		validateIpAddressService = CDI.current().select(ValidateIpAddressService.class).get();
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		
		val targetIpAddress = Ipv4Address.parse(HttpClientIpAddress.get(httpRequest));
		
		if(!validateIpAddressService.validate(targetIpAddress)) {
			// IPアドレス検証失敗
			val httpResponse = (HttpServletResponse) response;
			response.setContentType("text/html; charset=UTF-8");
			try(val writer = httpResponse.getWriter()) {
				writer.append("<html>" 
						+ "<meta http-equiv=\"content-type\" charset=\"utf-8\">" 
						+ "このIPアドレスからのアクセスは許可されていません。"
						+ "</html>");
			}
    		httpResponse.setStatus(403);
        	return;
        }
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}

}
