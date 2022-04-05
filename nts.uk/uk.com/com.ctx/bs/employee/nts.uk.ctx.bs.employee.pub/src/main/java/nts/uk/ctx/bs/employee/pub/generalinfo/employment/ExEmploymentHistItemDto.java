package nts.uk.ctx.bs.employee.pub.generalinfo.employment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ExEmploymentHistItemDto {
	
	private String historyId;
	
	private DatePeriod period;
	
	private String employmentCode;
	
}
