package nts.uk.shr.infra.web.session;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.val;
import nts.gul.web.HttpFullPath;
import nts.uk.shr.com.program.nosession.PathsNoSession;
import nts.uk.shr.infra.web.ScreenPath;

public class ScreenLoginSessionValidator implements Filter {
	
	private static final ServletPathsNoSession PATHS_NO_SESSION = new ServletPathsNoSession(
			PathsNoSession.WEB_SCREENS,
			r -> r.getServletPath());

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		// セッションの有無をチェック
		if (!PATHS_NO_SESSION.validate(request)) {
			// 必要なセッションがない場合
            val httpResponse = (HttpServletResponse) response;
            val httpRequest = (HttpServletRequest) request;
            
            // Origin情報を含めないために相対パスへ変換
            // リバースプロキシを使用しているとOrigin部分が変化するため
    		val subject = new HttpFullPath(httpRequest.getRequestURI().toString());
    		val target = new HttpFullPath(ScreenPath.basedOn(request).error().sessionTimeout().toString());
    		String relativePath = subject.relativize(target);
    		
    		//元々アクセスしようとしていたURLをパラメータで渡す
    		relativePath = relativePath + "?requestUrl=" + subject.getPath();
    		
            //sendRedirectでは相対パスを扱えない為
    		httpResponse.addHeader("Location", relativePath);
    		httpResponse.setStatus(302);
            return;
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}
}
