package nts.uk.ctx.basic.dom.training.jobtitle;

import nts.arc.error.BusinessException;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.gul.text.StringUtil;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;

import java.util.List;

import lombok.*;

@Getter
public class JobTitleTraining extends AggregateRoot {

	
	@Setter
	private PositionCodeTraining positionCodeTraining;
	
	private JobTitleCodeTraining jobTitleCodeTraining;
	
	private List<HistoryTraining> historyTrainings;
	
	@Setter
	private boolean isAbrogated;
	
	private boolean treatAsAManager;
	
	@Override
	public void validate() {
		super.validate();
		if (this.jobTitleCodeTraining == null || StringUtil.isNullOrEmpty(this.jobTitleCodeTraining.v(), true)) {
			throw new BusinessException("ER013");
		}
		
		if (this.positionCodeTraining == null || StringUtil.isNullOrEmpty(this.positionCodeTraining.v(), true)) {
			throw new BusinessException("ER013");
		}
	}
	
	/**
	 * 
	 * @param position
	 * @param jobCode
	 * @param historyTraining
	 * @param isAbrogated
	 * @param treatAsAManager
	 */
	public JobTitleTraining(
			PositionCodeTraining position, 
			JobTitleCodeTraining jobCode,
			List<HistoryTraining> historyTraining, 
			boolean isAbrogated, 
			boolean treatAsAManager
		) {
		super();
		this.jobTitleCodeTraining = jobCode;
		this.positionCodeTraining = position;
		this.isAbrogated = isAbrogated;
		this.treatAsAManager = treatAsAManager;
		this.historyTrainings.addAll(historyTraining);
	}
	
//	methods
	public boolean checkAbrogated() {
		return this.isAbrogated;
	}

	/**
	 * validate the JobTitle
	 * @param newStartDate
	 * @return true if JobTitle is valid
	 */
	public boolean checkNewStartDate(GeneralDate newStartDate)
	{
		return newStartDate.after(this.historyTrainings.get(this.historyTrainings.size()).getStartDate());
	}
	
	/**
	 * Create a Job Title from Java type
	 * @param positionCode
	 * @param jobTitleCode
	 * @param historyTraining
	 * @param abrogated
	 * @param treatAsAManager
	 * @return JobTitle
	 */
	public static JobTitleTraining createFromJavaType(String positionCode, String jobTitleCode, List<HistoryTraining> historyTraining,
			boolean abrogated, boolean treatAsAManager) {
		return new JobTitleTraining(new PositionCodeTraining(positionCode),
				new JobTitleCodeTraining(jobTitleCode),
				historyTraining,
				abrogated,
				treatAsAManager);
	}
}