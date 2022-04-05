package nts.uk.ctx.sys.gateway.app.command.changepassword;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.task.tran.TransactionService;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.ChangeLoginPasswordOfUser;
import nts.uk.shr.com.url.RegisterEmbededURL;

@Stateless
@Transactional
public class ForgotPasswordCommandHandler extends CommandHandler<ForgotPasswordCommand> {
	
	@Inject
	private ChangePasswordCommandRequire requireProvider;
	
	@Inject
	private TransactionService transaction;
	
	@Inject
	private RegisterEmbededURL registerEmbededURL;
	
	@Override
	protected void handle(CommandHandlerContext<ForgotPasswordCommand> context) {
		ForgotPasswordCommand command = context.getCommand();
		val require = requireProvider.createRequire();
		
		// 埋め込みURLが正しいか検証
		this.registerEmbededURL.checkPassLimitExpire(command.getEmbeddedId());
		
		val atomTask = ChangeLoginPasswordOfUser.change(
				require, 
				command.getUserId(), 
				command.getNewPassword(), 
				command.getConfirmNewPassword());
		
		transaction.execute(atomTask);
	}
	
	public static interface Require extends ChangeLoginPasswordOfUser.Require {
		
	}
}
