/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.toppage;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppage.Toppage;
import nts.uk.ctx.sys.portal.dom.toppage.service.TopPageService;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class CopyTopPageCommandHandler.
 */
@Stateless
public class CopyTopPageCommandHandler extends CommandHandler<CopyTopPageCommand>{
	
	/** The Top page service. */
	@Inject
	private TopPageService topPageService;
	
	@Override
	protected void handle(CommandHandlerContext<CopyTopPageCommand> context) {
		
		CopyTopPageCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		boolean isCheckOverWrite = command.isCheckOverwrite;
		String copyCode = command.getCopyCode();
		Toppage tp = Toppage.createFromMemento(command);
		topPageService.copyTopPage(tp, companyId, isCheckOverWrite, copyCode);
	}

}
