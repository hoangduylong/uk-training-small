package nts.uk.ctx.bs.employee.dom.jobtitle.main;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class JobTitleMain extends AggregateRoot{
	/**
	 * domain : 職務職位 - JobPositionMain
	 */

	private String jobTitleId;
	
	private String sid;
	
	private DateHistoryItem dateHistoryItem;
	
	public static JobTitleMain creatFromJavaType(String jobTitleId, String sid , String hisid, GeneralDate startDate, GeneralDate endDate) {
		return new JobTitleMain(jobTitleId, hisid, new DateHistoryItem(hisid, new DatePeriod(startDate, endDate)));
		
	}
	
}
