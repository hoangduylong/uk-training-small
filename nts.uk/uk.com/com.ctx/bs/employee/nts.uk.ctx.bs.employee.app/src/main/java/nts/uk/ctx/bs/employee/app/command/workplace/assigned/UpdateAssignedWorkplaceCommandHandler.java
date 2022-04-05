package nts.uk.ctx.bs.employee.app.command.workplace.assigned;

import java.util.ArrayList;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.workplace.assigned.AssignedWorkplace;
import nts.uk.ctx.bs.employee.dom.workplace.assigned.AssignedWrkplcRepository;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateAssignedWorkplaceCommandHandler extends CommandHandler<UpdateAssignedWorkplaceCommand>
	implements PeregUpdateCommandHandler<UpdateAssignedWorkplaceCommand>{

	@Inject
	private AssignedWrkplcRepository assignedWrkplcRepository;
	@Override
	public String targetCategoryCd() {
		return "CS00010";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateAssignedWorkplaceCommand.class;
	}


	@Override
	protected void handle(CommandHandlerContext<UpdateAssignedWorkplaceCommand> context) {
		val command = context.getCommand();
		DateHistoryItem dateItem = new DateHistoryItem(command.getHistoryId(),new DatePeriod(command.getStartDate(), command.getEndDate()));
		AssignedWorkplace domain = new AssignedWorkplace(command.getEmployeeId(), command.getAssignedWorkplaceId(), command.getWorkplaceId(),
				new ArrayList<>());
		domain.add(dateItem);
		
		assignedWrkplcRepository.updateAssignedWorkplace(domain);
		
	}

}
