package nts.uk.ctx.basic.app.command.training.jobtitle;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;

@Stateless
@Transactional
public class JobTitleCommandCheck{
	
	/**
	 * validate command
	 * @param command
	 * @param jobTitleTraining
	 * @param isAdd - true = addCommand, false = updateCommand
	 */
	protected static void check(JobTitleCommand command, Optional<JobTitleTraining> jobTitleTraining, boolean isAdd)
	{
		if(isAdd)
		{
			// check nếu tồn tại JobTitleCode
			if (jobTitleTraining.isPresent())
			{
				throw new BusinessException("Msg_3");
			}
		}
		else
		{
			if (!jobTitleTraining.isPresent())
			{
				throw new BusinessException("Msg_4");
			}
		}
		
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