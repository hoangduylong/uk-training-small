package nts.uk.ctx.bs.employee.app.command.jobtitle.main;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.jobtitle.main.JobTitleMainRepository;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;
@Stateless
public class DeleteJobTitleMainCommandHandler extends CommandHandler<DeleteJobTitleMainCommand>
	implements PeregDeleteCommandHandler<DeleteJobTitleMainCommand>{

	@Inject
	private JobTitleMainRepository jobTitleMainRepository;
	@Override
	public String targetCategoryCd() {
		return "CS00009";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteJobTitleMainCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteJobTitleMainCommand> context) {
		val command = context.getCommand();
		
		jobTitleMainRepository.deleteJobTitleMain(command.getJobTitleId());
	}

}
