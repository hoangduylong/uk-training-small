package nts.uk.ctx.basic.app.command.training.jobtitle;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;

@Stateless
public class JobTitleCommandCheck {

	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;

	/**
	 * validate command
	 * @param command
	 */
	public void check(JobTitleCommand command) {
		Optional<JobTitleTraining> jobTitleTraining = jobTitleRepositoryTraining.find(command.getJobTitleCode());
		
		// check exist JobTitleCode when add and is not exist when update
		if (command.isAdd()) {
			if(jobTitleTraining.isPresent()) {
				throw new BusinessException("Msg_2");
			}
		}
		else {
			if(!jobTitleTraining.isPresent()) {
				throw new BusinessException("Msg_3");
			}
		}
		
		// check HistoryTrainings is empty 
		if(command.getHistoryTrainings().size() < 1){
	
			throw new BusinessException("Msg_5");
		}
	}
}