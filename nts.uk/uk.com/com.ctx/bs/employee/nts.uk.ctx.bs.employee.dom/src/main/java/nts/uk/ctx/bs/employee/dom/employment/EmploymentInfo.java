package nts.uk.ctx.bs.employee.dom.employment;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;

@Setter
@Getter
public class EmploymentInfo {
	
	private String employmentCode;
	private String employmentName;
	
	/**
	 * 履歴の期間
	 * レスポンス対応のために後付けで追加したので、値が入っているとは限らない
	 */
	private DatePeriod period;

}
