package command.person.widowhistory;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.person.dom.person.info.widowhistory.WidowHistory;
import nts.uk.ctx.bs.person.dom.person.info.widowhistory.WidowHistoryRepository;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;
@Stateless
public class AddWidowHistoryCommandHandler extends CommandHandlerWithResult<AddWidowHistoryCommand,PeregAddCommandResult>
 implements PeregAddCommandHandler<AddWidowHistoryCommand>{
	
	@Inject
	private WidowHistoryRepository widowHistoryRepository;
	
	@Override
	public String targetCategoryCd() {
		return null;
	}

	@Override
	public Class<?> commandClass() {
		return AddWidowHistoryCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddWidowHistoryCommand> context) {
		val command = context.getCommand();
		
		// Create new Id
		String newId = IdentifierUtil.randomUniqueId();
		
		WidowHistory widowHistory = WidowHistory.createObjectFromJavaType(newId, command.getWidowType(), command.getStartDate(), command.getEndDate());
		
		// Add WidowHistory
		widowHistoryRepository.addWidowHistory(widowHistory);
		
		return new PeregAddCommandResult(newId);
	}

}
