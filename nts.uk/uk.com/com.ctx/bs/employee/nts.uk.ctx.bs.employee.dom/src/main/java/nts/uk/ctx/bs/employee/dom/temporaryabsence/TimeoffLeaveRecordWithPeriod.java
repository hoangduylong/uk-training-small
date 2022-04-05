package nts.uk.ctx.bs.employee.dom.temporaryabsence;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;
@Getter
@RequiredArgsConstructor
public class TimeoffLeaveRecordWithPeriod {
		/** 期間**/
		private final DatePeriod datePeriod; 
		/** 履歴項目**/
		private final TempAbsenceHisItem TempAbsenceHisItem;
}
