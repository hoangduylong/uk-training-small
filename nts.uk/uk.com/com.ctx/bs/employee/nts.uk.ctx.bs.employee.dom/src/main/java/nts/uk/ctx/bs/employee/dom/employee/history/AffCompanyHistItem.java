package nts.uk.ctx.bs.employee.dom.employee.history;

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
/** 所属会社履歴項目 */
public class AffCompanyHistItem extends HistoryItem<DatePeriod, GeneralDate> {
	/** 履歴ID */
	private String historyId;

	/** 出向先データである */
	private boolean destinationData;

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
	
	public boolean includePeriod(DatePeriod period) {
		return this.datePeriod.start().beforeOrEquals(period.end())
				&& this.datePeriod.end().afterOrEquals(period.start());
	}
	
	public boolean beforeOrEqualsStandardDate(GeneralDate standardDate) {
		return datePeriod.end().beforeOrEquals(standardDate);
	}
	
	public boolean afterOrEqualsStandardDate(GeneralDate standardDate) {
		return datePeriod.start().afterOrEquals(standardDate);
	}
	
}
