/**
 * @author hieult
 */
package nts.uk.ctx.sys.portal.app.command.flowmenu;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenu;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenuRepository;
import nts.uk.ctx.sys.portal.dom.flowmenu.service.FlowMenuService;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartName;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@Transactional
public class UpdateFlowMenuCommandHandler extends CommandHandler<UpdateFlowMenuCommand> {
	
	@Inject
	private FlowMenuRepository repository;

	@Inject
	private FlowMenuService flowMenuService;
	
	@Override
	protected void handle(CommandHandlerContext<UpdateFlowMenuCommand> context) {
		String companyId = AppContexts.user().companyId();
		UpdateFlowMenuCommand command = context.getCommand();
		
		Optional<FlowMenu> checkFlowMenu = repository.findByToppagePartCodeAndType(
				companyId,
				command.getTopPageCode(),
				0);
		if (!checkFlowMenu.isPresent())
			throw new RuntimeException("Can't find FlowMenu with code: " + command.getTopPageCode());
		
		// Update FLowMenu
		FlowMenu flowMenu = checkFlowMenu.get();
		flowMenu.setName(new TopPagePartName(command.getTopPageName()));
		flowMenu.setFileID(command.getFileID());
		flowMenu.setDefClassAtr(command.getDefClassAtr());
		flowMenuService.updateFlowMenu(flowMenu);
	}
}