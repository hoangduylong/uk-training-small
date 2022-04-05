package nts.uk.ctx.bs.employee.app.command.department;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.department.CurrentAffiDeptRepository;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteCurrentAffiDeptCommandHandler extends CommandHandler<DeleteCurrentAffiDeptCommand>
	implements PeregDeleteCommandHandler<DeleteCurrentAffiDeptCommand>{

	@Inject
	private CurrentAffiDeptRepository currentAffiDeptRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00012";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteCurrentAffiDeptCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteCurrentAffiDeptCommand> context) {
		val command = context.getCommand();
		
		currentAffiDeptRepository.deleteCurrentAffiDept(command.getAffiDeptId());
	}

}
