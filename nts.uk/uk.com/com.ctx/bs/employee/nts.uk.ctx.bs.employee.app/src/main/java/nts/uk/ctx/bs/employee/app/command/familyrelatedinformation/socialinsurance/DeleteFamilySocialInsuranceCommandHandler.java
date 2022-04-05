package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.socialinsurance;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.socialinsurance.FamilySocialInsuranceRepository;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteFamilySocialInsuranceCommandHandler extends CommandHandler<DeleteFamilySocialInsuranceCommand>
	implements PeregDeleteCommandHandler<DeleteFamilySocialInsuranceCommand>{

	@Inject
	private FamilySocialInsuranceRepository familySocialInsuranceRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00006";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteFamilySocialInsuranceCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteFamilySocialInsuranceCommand> context) {
		val command = context.getCommand();
		
		familySocialInsuranceRepository.deleteFamilySocialInsurance(command.getSocailInsuaranceId());
		
	}

}
