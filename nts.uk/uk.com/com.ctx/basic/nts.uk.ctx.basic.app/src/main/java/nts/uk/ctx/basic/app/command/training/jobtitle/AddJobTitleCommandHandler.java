package nts.uk.ctx.basic.app.command.training.jobtitle;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleCodeTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;
@Stateless
@Transactional
public class AddJobTitleCommandHandler extends CommandHandler<JobTitleCommand>{

	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;
	
	@Inject
	private JobTitleCommandCheck check;
	

	public List<HistoryTraining> toListDomain(List<HistoryCommand> listHistories) {
		List<HistoryTraining> result = new ArrayList<HistoryTraining>();
		for (HistoryCommand history : listHistories) {
			result.add(new HistoryTraining(history.getHistoryId(),
					history.getJobTitleCode(),
					history.getJobTitleName(),
					history.getStartDate(),
					history.getEndDate()));
		}
		return result;
	}
	
	// To domain
		public JobTitleTraining toDomain(JobTitleCommand command) {
			return new JobTitleTraining(
					new PositionCodeTraining(command.getPositionCodeTraining()),
					new JobTitleCodeTraining(command.getJobTitleCode()),
					this.toListDomain(command.getHistoryTrainings()),
					command.isAbrogated(),
					command.isTreatAsAManager());
		}
	
	@Override
	protected void handle(CommandHandlerContext<JobTitleCommand> context) {
		JobTitleCommand addCommand = context.getCommand();
		boolean checkUpdate = jobTitleRepositoryTraining.checkAddUpdate(addCommand.getJobTitleCode());
		
		if (addCommand.isAdd() && checkUpdate)
			check.check(addCommand, checkUpdate);
		
		if (!checkUpdate)
			jobTitleRepositoryTraining.add(this.toDomain(addCommand));
		else 
			jobTitleRepositoryTraining.update(this.toDomain(addCommand));
	}
}