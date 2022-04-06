package nts.uk.ctx.basic.app.command.training.jobtitle;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;

@Stateless
@Transactional
public class JobTitleCommandCheck{
	protected static void check(JobTitleCommand command, Optional<JobTitleTraining> jobTitleTraining)
	{
		//Check nếu trùng lịch sử cũ
		jobTitleTraining.get().getHistoryTrainings().forEach((history) ->
		{
			if (!jobTitleTraining.get().checkNewStartDate(history.getStartDate()))
			{
				throw new BusinessException("Msg_102");
			}
		});	
	}

}