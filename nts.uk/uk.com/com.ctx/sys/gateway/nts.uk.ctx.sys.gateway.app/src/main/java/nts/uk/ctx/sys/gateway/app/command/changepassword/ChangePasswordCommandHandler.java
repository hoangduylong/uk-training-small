/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.command.changepassword;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.task.tran.TransactionService;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.ChangeLoginPasswordOfUser;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class MailNoticeSetSaveCommandHandler.
 */
@Stateless
@Transactional
public class ChangePasswordCommandHandler extends CommandHandler<ChangePasswordCommand> {
	
	@Inject
	private ChangePasswordCommandRequire requireProvider;
	
	@Inject
	private TransactionService transaction;
	
	@Override
	protected void handle(CommandHandlerContext<ChangePasswordCommand> context) {
		ChangePasswordCommand command = context.getCommand();
		val require = requireProvider.createRequire();
		
		val atomTask = ChangeLoginPasswordOfUser.change(
				require, 
				AppContexts.user().userId(), 
				command.getOldPassword(), 
				command.getNewPassword(), 
				command.getConfirmNewPassword());
		
		transaction.execute(atomTask);
	}
	
	public static interface Require extends ChangeLoginPasswordOfUser.Require {
		
	}
}
