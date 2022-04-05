package nts.uk.ctx.bs.employee.app.command.position.jobposition;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.position.jobposition.SubJobPosRepository;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteSubJobPositionCommandHandler extends CommandHandler<DeleteSubJobPositionCommand>
	implements PeregDeleteCommandHandler<DeleteSubJobPositionCommand>{

	@Inject
	private SubJobPosRepository subJobPosRepository;
	@Override
	public String targetCategoryCd() {
		return "CS00013";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteSubJobPositionCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteSubJobPositionCommand> context) {
		val command = context.getCommand();
		
		subJobPosRepository.deleteSubJobPosition(command.getSubJobPosId());
		
		
	}

}
