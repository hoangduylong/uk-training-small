package nts.uk.ctx.bs.employee.app.command.position.jobposition;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.employee.dom.position.jobposition.SubJobPosRepository;
import nts.uk.ctx.bs.employee.dom.position.jobposition.SubJobPosition;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddSubJobPositionCommandHandler extends CommandHandlerWithResult<AddSubJobPositionCommand,PeregAddCommandResult>
	implements PeregAddCommandHandler<AddSubJobPositionCommand>{

	@Inject
	private SubJobPosRepository subJobPosRepository;
	@Override
	public String targetCategoryCd() {
		return "CS00013";
	}

	@Override
	public Class<?> commandClass() {
		return AddSubJobPositionCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddSubJobPositionCommand> context) {
		val command = context.getCommand();
		
		String newId = IdentifierUtil.randomUniqueId();
		
		SubJobPosition domain = SubJobPosition.createFromJavaType(newId, command.getAffiDeptId(), command.getJobTitleId(), command.getStartDate(), command.getEndDate());
		subJobPosRepository.addSubJobPosition(domain);
		return new PeregAddCommandResult(newId);
		
		
	}

}
