/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.mypage.setting;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSetting;
import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSettingRepository;

/**
 * The Class UpdateMyPageSettingCommandHandler.
 */
@Stateless
public class UpdateMyPageSettingCommandHandler extends CommandHandler<UpdateMyPageSettingCommand> {

	/** The my page setting repository. */
	@Inject
	private MyPageSettingRepository myPageSettingRepository;

	/* (non-Javadoc)
	 * @see nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command.CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<UpdateMyPageSettingCommand> context) {
		UpdateMyPageSettingCommand command = context.getCommand();

		// to Domain
		MyPageSetting mps = command.toDomain();

		// update
		myPageSettingRepository.update(mps);
	}

}
