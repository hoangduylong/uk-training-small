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
	
	@Override
	protected void handle(CommandHandlerContext<JobTitleCommand> context) {
		JobTitleCommand addCommand = context.getCommand();
		
		JobTitleCommandCheck.check(addCommand, true);
		
//		List<HistoryTraining> historyTraining = HistoryTraining.makeListHistory(addCommand.getHistoryId(),
//				addCommand.getJobTitleCode(),
//				addCommand.getJobTitleName(),
//				addCommand.getStartDate(),
//				addCommand.getEndDate());
//		
//		jobTitleRepositoryTraining.add(JobTitleTraining.createFromJavaType(
//				addCommand.getPositionCode(),
//				addCommand.getJobTitleCode(),
//				historyTraining,
//				addCommand.isAbrogated(),
//				addCommand.isTreatAsAManager()));
	}
}