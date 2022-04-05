package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.care;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.care.FamilyCare;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.care.FamilyCareRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateFamilyCareCommandHandler extends CommandHandler<UpdateFamilyCareCommand>
	implements PeregUpdateCommandHandler<UpdateFamilyCareCommand>{

	@Inject
	private FamilyCareRepository familyCareRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00007";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateFamilyCareCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateFamilyCareCommand> context) {
		val command = context.getCommand();
		
		FamilyCare domain = FamilyCare.createFromJavaType(command.getFamilyCareId(), command.getFamilyId(), command.getSid(), command.getStartDate(), command.getEndDate(), command.getCareClassifi());
		
		familyCareRepository.updateFamilyCare(domain);
		
		
	}

}
