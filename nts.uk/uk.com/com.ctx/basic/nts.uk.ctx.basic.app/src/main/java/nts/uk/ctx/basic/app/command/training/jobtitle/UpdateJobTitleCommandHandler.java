
package nts.uk.ctx.basic.app.command.training.jobtitle;


import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;

@Stateless
@Transactional
public class UpdateJobTitleCommandHandler extends CommandHandler<JobTitleCommand>{
	
	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;
		
	@Override
	protected void handle(CommandHandlerContext<JobTitleCommand> context) {
		
		JobTitleCommand updateCommand = context.getCommand();
		
		Optional<JobTitleTraining> jobTitleTraining = jobTitleRepositoryTraining.find(updateCommand.getJobTitleCode());
		
		// check nếu không tồn tại JobTitleCode
		if (jobTitleTraining.isPresent())
		{
			throw new BusinessException("Msg_103");
		}
		
		JobTitleCommandCheck.check(updateCommand, jobTitleTraining);
		
		List<HistoryTraining> historyTraining = HistoryTraining.makeListHistory(updateCommand.getHistoryId(),
				updateCommand.getJobTitleCode(),
				updateCommand.getJobTitleName(),
				updateCommand.getStartDate(),
				updateCommand.getEndDate());
		
		jobTitleRepositoryTraining.update(JobTitleTraining.createFromJavaType(
				updateCommand.getPositionCode(),
				updateCommand.getJobTitleCode(),
				historyTraining,
				false,
				updateCommand.isTreatAsAManager()));
	}
}