package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.incometax;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax.IncomeTaxRepository;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteIncomeTaxCommandHandler extends CommandHandler<DeleteIncomeTaxCommand>
	implements PeregDeleteCommandHandler<DeleteIncomeTaxCommand>{

	@Inject
	private IncomeTaxRepository incomeTaxRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00005";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteIncomeTaxCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteIncomeTaxCommand> context) {
		val command = context.getCommand();
		incomeTaxRepository.deleteIncomeTax(command.getIncomeTaxID());
	}

}
