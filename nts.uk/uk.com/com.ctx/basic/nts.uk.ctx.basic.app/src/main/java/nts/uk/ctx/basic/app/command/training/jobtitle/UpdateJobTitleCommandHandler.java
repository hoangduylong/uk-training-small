
package nts.uk.ctx.basic.app.command.training.jobtitle;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;

@Stateless
@Transactional
public class UpdateJobTitleCommandHandler extends CommandHandler<JobTitleCommand>{
	
	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;
	
	@Inject
	private JobTitleCommandCheck check;
		
	@Override
	protected void handle(CommandHandlerContext<JobTitleCommand> context) {
		
		JobTitleCommand updateCommand = context.getCommand();
		
		check.check(updateCommand, false);
		
//		List<HistoryTraining> historyTraining = HistoryTraining.makeListHistory(updateCommand.getHistoryId(),
//				updateCommand.getJobTitleCode(),
//				updateCommand.getJobTitleName(),
//				updateCommand.getStartDate(),
//				updateCommand.getEndDate());
//		
//		jobTitleRepositoryTraining.update(JobTitleCommand.toDomain(updateCommand));
	}
}