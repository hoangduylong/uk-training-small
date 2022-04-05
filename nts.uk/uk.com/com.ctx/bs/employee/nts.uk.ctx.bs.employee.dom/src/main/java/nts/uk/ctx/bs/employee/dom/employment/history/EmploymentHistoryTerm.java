package nts.uk.ctx.bs.employee.dom.employment.history;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;
/**
 * 期間付き雇用履歴項目
 * @author HieuLt
 *
 */
@Getter
@RequiredArgsConstructor
public class EmploymentHistoryTerm {
		/** 期間 **/ 
		private final DatePeriod  datePeriod;
		/** 履歴項目 **/
		private final EmploymentHistoryItem employmentHistoryItem;
		
}
