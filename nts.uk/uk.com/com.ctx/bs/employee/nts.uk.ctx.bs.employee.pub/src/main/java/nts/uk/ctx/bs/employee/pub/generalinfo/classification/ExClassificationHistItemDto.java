package nts.uk.ctx.bs.employee.pub.generalinfo.classification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ExClassificationHistItemDto {
	
	private String historyId;
	
	private DatePeriod period;
	
	private String classificationCode;
	
}
