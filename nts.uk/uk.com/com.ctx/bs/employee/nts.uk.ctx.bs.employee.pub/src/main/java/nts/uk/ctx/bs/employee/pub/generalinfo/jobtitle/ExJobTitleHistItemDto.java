package nts.uk.ctx.bs.employee.pub.generalinfo.jobtitle;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ExJobTitleHistItemDto {
	
	private String historyId;
	
	private DatePeriod period;
	
	private String jobTitleId;
	
}
