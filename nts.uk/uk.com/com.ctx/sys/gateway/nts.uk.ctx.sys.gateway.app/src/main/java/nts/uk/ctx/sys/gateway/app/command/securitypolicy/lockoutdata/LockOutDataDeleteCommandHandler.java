/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.command.securitypolicy.lockoutdata;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockOutDataRepository;

/**
 * The Class LockOutDataDeleteCommandHandler.
 */
@Stateless
public class LockOutDataDeleteCommandHandler  extends CommandHandler<LockOutDataDeleteCommand>  {
	
	/** The lock out data repository. */
	@Inject
	private LockOutDataRepository lockOutDataRepository;

	/*
	 * CLI001_ロックアウト一覧.解除処理
	 */
	@Override
	protected void handle(CommandHandlerContext<LockOutDataDeleteCommand> context) {
		// Get new domain
		LockOutDataDeleteCommand command = context.getCommand();
		List<String> lstUserId = command.getLstUserId();
		//アルゴリズム「ロックアウト削除」を実行する ※1件目からListの最後まで、実行する。  
		this.lockOutDataRepository.remove(lstUserId);
	}
}
