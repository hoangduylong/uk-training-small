package nts.uk.ctx.basic.app.command.training.jobtitle;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;

@Stateless
public class JobTitleCommandCheck {

	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;

	/**
	 * validate command
	 * 
	 * @param command
	 * @param jobTitleTraining
	 * @param isAdd            - true = addCommand, false = updateCommand
	 */
	public void check(JobTitleCommand command, boolean isAdd) {
			if (isAdd) { // check nếu tồn tại JobTitleCode
				throw new BusinessException("Msg_3");
			} 

		// Check nếu trùng lịch sử cũ
//		command.getStartDate().forEach((startDate) ->
//		{	
//			if (!jobTitleTraining.get().checkNewStartDate(GeneralDate.fromString(startDate, "YYYY/MM/DD")))
//			{
//				throw new BusinessException("Msg_102");
//			}
//		});
	}

}