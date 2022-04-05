package command.person.widowhistory;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.person.dom.person.info.widowhistory.WidowHistory;
import nts.uk.ctx.bs.person.dom.person.info.widowhistory.WidowHistoryRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;
@Stateless
public class UpdateWidowHistoryCommandHandler extends CommandHandler<UpdateWidowHistoryCommand>
 implements PeregUpdateCommandHandler<UpdateWidowHistoryCommand>{
	
	@Inject
	private WidowHistoryRepository widowHistoryRepository;
	
	@Override
	public String targetCategoryCd() {
		return null;
	}

	@Override
	public Class<?> commandClass() {
		return UpdateWidowHistoryCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateWidowHistoryCommand> context) {
		val command = context.getCommand();
		
		WidowHistory widowHistory = WidowHistory.createObjectFromJavaType(command.getWidowHistoryId(), command.getWidowType(), command.getStartDate(), command.getEndDate());
		
		// Update WidowHistory
		widowHistoryRepository.updateWidowHistory(widowHistory);
	}

}
