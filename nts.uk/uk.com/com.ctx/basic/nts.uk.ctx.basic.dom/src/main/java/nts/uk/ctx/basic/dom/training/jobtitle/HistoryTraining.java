package nts.uk.ctx.basic.dom.training.jobtitle;

import lombok.Data;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

@Data
public class HistoryTraining{
	private final String historyId;
	private JobTitleCodeTraining jobTitleCodeTraining;
	private JobTitleNameTraining jobTitleNameTraining;
	private GeneralDate startDate;
	private GeneralDate endDate;

	public HistoryTraining(String historyId, JobTitleCodeTraining jobTitleCodeTraining, JobTitleNameTraining jobTitleNameTraining, GeneralDate startDate, GeneralDate endDate) {
		super();
		this.historyId = historyId;
		this.jobTitleCodeTraining = jobTitleCodeTraining;
		this.jobTitleNameTraining = jobTitleNameTraining;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	public DatePeriod getDatePeriod() {
		return new DatePeriod(startDate, endDate);
	}
	
	/**
	 * Check 
	 */
	public boolean isValidDate() {
		return startDate.before(endDate);
	}

	/**
	 * @param jobTitleCode
	 * @param startDate
	 * @param endDate
	 */
	public HistoryTraining(String historyId, String jobTitleCode, String jobTitleName, String startDate, String endDate) {

		this.historyId = historyId;
		this.jobTitleCodeTraining = new JobTitleCodeTraining(jobTitleCode);
		this.jobTitleNameTraining = new JobTitleNameTraining(jobTitleName);
		this.startDate = GeneralDate.fromString(startDate, "yyyy/MM/dd");
		this.endDate = GeneralDate.fromString(endDate, "yyyy/MM/dd");
	}
	
	/**
	 * Convert String to History
	 */
	public static HistoryTraining fromString(String historyId, String stringJobTitleCode, String stringJobTitleName, String source, String dateFormat, String delimiter) {
		String[] dates = source.split(delimiter);
		JobTitleCodeTraining rawJobTitleCode = new JobTitleCodeTraining(stringJobTitleCode);
		JobTitleNameTraining rawJobTitleName = new JobTitleNameTraining(stringJobTitleName);
		return new HistoryTraining(
				historyId,
				rawJobTitleCode,
				rawJobTitleName,
				GeneralDate.fromString(dates[0], dateFormat),
				GeneralDate.fromString(dates[1], dateFormat));
	}
}