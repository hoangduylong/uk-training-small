package nts.uk.ctx.bs.employee.pub.employment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmploymentCodeAndPeriod {
	
	// 履歴ID
	private String historyID;
	
	// 期間
	private  DatePeriod datePeriod;
	
	// 雇用コード
	private String employmentCode;

}
