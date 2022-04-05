package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.care;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.care.FamilyCareRepository;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteFamilyCareCommandHandler extends CommandHandler<DeleteFamilyCareCommand>
	implements PeregDeleteCommandHandler<DeleteFamilyCareCommand>{

	@Inject
	private FamilyCareRepository familyCareRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00007";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteFamilyCareCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteFamilyCareCommand> context) {
		val command = context.getCommand();
		
		familyCareRepository.deleteFamilyCare(command.getFamilyCareId());
		
		
	}

}
