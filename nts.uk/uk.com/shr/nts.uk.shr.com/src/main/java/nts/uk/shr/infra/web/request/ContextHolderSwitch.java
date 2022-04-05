package nts.uk.shr.infra.web.request;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import nts.arc.scoped.request.RequestContextProvider;
import nts.arc.scoped.session.SessionContextProvider;

/**
 * CdiSessionContextProviderが内部でCDI.current.selectを呼んでおり、これが非常に遅い。
 * 大量のレコードをINSERTする場合、何度もこれが呼ばれるため、できるだけThreadLocalの方が使われるようにしたい。
 * そのため、このフィルタであらかじめThreadLocalにセットしてしまう。
 */
public class ContextHolderSwitch implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		SessionContextProvider.switchToThread();
		RequestContextProvider.switchToThread();
		
		try {
			chain.doFilter(request, response);
		} finally {
			// doFilter内で書き換えられている可能性があるので、ちゃんとCDIに反映する必要がある
			SessionContextProvider.switchToCdi();
			RequestContextProvider.switchToCdi();
		}
	}

	@Override
	public void destroy() {
	}
	
}
