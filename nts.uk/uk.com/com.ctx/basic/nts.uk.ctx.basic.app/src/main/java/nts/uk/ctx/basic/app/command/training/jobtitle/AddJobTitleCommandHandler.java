package nts.uk.ctx.basic.app.command.training.jobtitle;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;
import nts.uk.ctx.basic.app.command.training.jobtitle.JobTitleCommand;
@Stateless
@Transactional
public class AddJobTitleCommandHandler extends CommandHandler<JobTitleCommand>{

	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;
	
	@Inject
	private JobTitleCommandCheck check;
	
	@Override
	protected void handle(CommandHandlerContext<JobTitleCommand> context) {
		JobTitleCommand addCommand = context.getCommand();
		boolean checkUpdate = jobTitleRepositoryTraining.checkAddUpdate(addCommand.getJobTitleCode());
		
		if (addCommand.isAdd() && checkUpdate)
			check.check(addCommand, checkUpdate);
		
		if (!checkUpdate)
			jobTitleRepositoryTraining.add(JobTitleCommand.toDomain(addCommand));
		else 
			jobTitleRepositoryTraining.update(JobTitleCommand.toDomain(addCommand));
	}
}