package nts.uk.ctx.sys.gateway.ws.singlesignon.saml;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import nts.arc.i18n.I18NText;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.gateway.app.command.login.saml.AuthenticateInfo;
import nts.uk.ctx.sys.gateway.app.command.login.saml.SamlAuthenticateCommand;
import nts.uk.ctx.sys.gateway.app.command.login.saml.SamlAuthenticateCommandHandler;
import nts.uk.ctx.sys.gateway.app.command.login.saml.SamlValidateCommand;
import nts.uk.ctx.sys.gateway.app.command.login.saml.SamlValidateCommandHandler;
import nts.uk.ctx.sys.gateway.app.command.login.saml.ValidateInfo;

/**
 * The Class SamlWs.
 */
@Path("ctx/sys/gateway/singlesignon/saml")
@Produces(MediaType.APPLICATION_JSON)
public class SamlWs extends WebService {

	/** The submit contract with sso. */
	@Inject
	private SamlAuthenticateCommandHandler authenticate;

	@Inject
	private SamlValidateCommandHandler validate;

	/**
	 * テナント認証＆SAMLRequest生成
	 * 
	 * @param command
	 * @return
	 */
	@POST
	@Path("authenticate")
	public AuthenticateInfo authenticate(SamlAuthenticateCommand command) {
		return this.authenticate.handle(command);
	}

	/**
	 * SAMLResponseの検証＆ログイン
	 * 
	 * @param request
	 * 
	 * ※Idpから叩いてもらう
	 */
	@POST
	@Path("validateandlogin")
	public Response validateAndLogin(@Context final HttpServletRequest request) {
		ValidateInfo validateInfo = this.validate.handle(new SamlValidateCommand(request));
		// 認証成功の場合
		if (validateInfo.isSamlValid()) {
			return Response.status(Status.FOUND).header("Location", validateInfo.getRequestUrl()).build();
		}
		// 認証失敗の場合
		
		return Response.status(Status.OK).type(MediaType.TEXT_HTML)
				.entity("<html>" 
						+ "<meta http-equiv=\"content-type\" charset=\"utf-8\">" 
						+ I18NText.getText(validateInfo.getErrorMessage())
						+ "</html>").build();
	}
}
