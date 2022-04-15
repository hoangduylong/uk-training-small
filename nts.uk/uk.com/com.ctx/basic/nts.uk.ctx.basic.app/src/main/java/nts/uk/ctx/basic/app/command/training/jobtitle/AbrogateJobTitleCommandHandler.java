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
public class AbrogateJobTitleCommandHandler extends CommandHandler<JobTitleCommand>{
		
	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;
	
	protected void handle(CommandHandlerContext<JobTitleCommand> context) {

		JobTitleCommand abrogateCommand = context.getCommand();
		
		Optional<JobTitleTraining> jobTitleTraining = jobTitleRepositoryTraining.find(abrogateCommand.getJobTitleCode());
		
		// check nếu không tồn tại JobTitleCode
		if (jobTitleTraining.isPresent())
		{
			throw new BusinessException("Msg_102");
		}
		
//		List<HistoryTraining> historyTraining = HistoryTraining.makeListHistory(abrogateCommand.getHistoryId(),
//				abrogateCommand.getJobTitleCode(),
//				abrogateCommand.getJobTitleName(),
//				abrogateCommand.getStartDate(),
//				abrogateCommand.getEndDate());
//		
//		jobTitleRepositoryTraining.update(JobTitleTraining.createFromJavaType(
//				abrogateCommand.getPositionCode(),
//				abrogateCommand.getJobTitleCode(),
//				historyTraining,
//				false,
//				abrogateCommand.isTreatAsAManager()));
		
		jobTitleTraining.get().setAbrogated(true);
    }
}