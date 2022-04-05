package nts.uk.ctx.bs.employee.app.command.position.jobposition;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.position.jobposition.SubJobPosRepository;
import nts.uk.ctx.bs.employee.dom.position.jobposition.SubJobPosition;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateSubJobPositionCommandHandler extends CommandHandler<UpdateSubJobPositionCommand>
	implements PeregUpdateCommandHandler<UpdateSubJobPositionCommand>{

	@Inject
	private SubJobPosRepository subJobPosRepository;
	@Override
	public String targetCategoryCd() {
		return "CS00013";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateSubJobPositionCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateSubJobPositionCommand> context) {
		val command = context.getCommand();
		
		SubJobPosition domain = SubJobPosition.createFromJavaType(command.getSubJobPosId(), command.getAffiDeptId(), command.getJobTitleId(), command.getStartDate(), command.getEndDate());
		subJobPosRepository.updateSubJobPosition(domain);
		
		
	}

}
