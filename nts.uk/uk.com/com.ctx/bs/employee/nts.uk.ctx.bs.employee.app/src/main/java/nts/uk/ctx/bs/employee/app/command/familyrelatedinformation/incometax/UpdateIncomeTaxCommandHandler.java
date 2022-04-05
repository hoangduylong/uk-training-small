package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.incometax;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax.IncomeTax;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax.IncomeTaxRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateIncomeTaxCommandHandler extends CommandHandler<UpdateIncomeTaxCommand>
	implements PeregUpdateCommandHandler<UpdateIncomeTaxCommand>{

	@Inject
	private IncomeTaxRepository incomeTaxRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00005";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateIncomeTaxCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateIncomeTaxCommand> context) {
		val command = context.getCommand();
		
		IncomeTax domain = IncomeTax.createFromJavaType(command.getIncomeTaxID(), command.getFamilyMemberId(), command.getSid(), command.getStartDate(), command.getEndDate(), command.isSupporter(), command.getDisabilityType(), command.getDeductionTargetType());
		incomeTaxRepository.updateIncomeTax(domain);
	}

}
