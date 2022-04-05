package nts.uk.ctx.sys.gateway.ws.login.password.userpassword;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.gateway.app.command.login.password.userpassword.ChangeOwnLoginPasswordCommand;
import nts.uk.ctx.sys.gateway.app.command.login.password.userpassword.ChangeOwnLoginPasswordCommandHandler;

/**
 * ユーザーのログインパスワードWS
 */
@Path("ctx/sys/gateway/login/password/userpassword")
@Produces("application/json")
public class LoginPasswordWs extends WebService{
	
	@Inject
	private ChangeOwnLoginPasswordCommandHandler changeLoginPasswordCommandHandler;
	
	/**
	 * 自分のログインパスワードを変更する
	 * @param command
	 */
	@Path("changeOwn")
	@POST
	public void changeOwn(ChangeOwnLoginPasswordCommand command) {
		changeLoginPasswordCommandHandler.handle(command);
	}
}
