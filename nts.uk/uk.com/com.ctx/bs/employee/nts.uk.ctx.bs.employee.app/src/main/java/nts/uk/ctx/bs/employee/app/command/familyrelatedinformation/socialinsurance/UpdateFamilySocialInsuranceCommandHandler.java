package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.socialinsurance;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.socialinsurance.FamilySocialInsurance;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.socialinsurance.FamilySocialInsuranceRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateFamilySocialInsuranceCommandHandler extends CommandHandler<UpdateFamilySocialInsuranceCommand>
	implements PeregUpdateCommandHandler<UpdateFamilySocialInsuranceCommand>{

	@Inject
	private FamilySocialInsuranceRepository familySocialInsuranceRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00006";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateFamilySocialInsuranceCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateFamilySocialInsuranceCommand> context) {
		val command = context.getCommand();
		
		FamilySocialInsurance domain = FamilySocialInsurance.createFromJavaType(command.getFamilyMemberId(), command.getSid(), command.getSocailInsuaranceId(), command.getStartDate(), command.getEndDate(),
				command.isNursingCare(), command.isHealthInsuranceDependent(), command.isNationalPensionNo3(), command.getBasicPensionNumber());
		
		familySocialInsuranceRepository.updateFamilySocialInsurance(domain);
		
	}

}
