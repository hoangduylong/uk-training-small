package nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.HistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/** 年月日期間の汎用履歴項目 */
public class HistoryItemsForDatePeriod extends HistoryItem<DatePeriod, GeneralDate> {
	/** 履歴ID */
	private String historyId;

	/** 所属期間 */
	private DatePeriod datePeriod;

	@Override
	public DatePeriod span() {
		return datePeriod;
	}

	@Override
	public String identifier() {
		return historyId;
	}

	@Override
	public void changeSpan(DatePeriod newSpan) {
		datePeriod = newSpan;
	}
	
	public boolean beforeOrEqualsStandardDate(GeneralDate standardDate) {
		return datePeriod.end().beforeOrEquals(standardDate);
	}
	
	public boolean afterOrEqualsStandardDate(GeneralDate standardDate) {
		return datePeriod.start().afterOrEquals(standardDate);
	}
	
}
