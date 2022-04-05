package nts.uk.ctx.bs.employee.pub.company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AffComHistItem {
	
	/** 履歴ID */
	private String historyId;

	/** 出向先データである */
	private boolean destinationData;

	/** 所属期間 */
	private DatePeriod datePeriod;

}
