package nts.uk.shr.com.history;

import nts.arc.time.YearMonth;
import nts.arc.time.calendar.period.YearMonthPeriod;

/**
 * Item of history that has a months period.
 * 年月期間の汎用履歴項目
 */
public class YearMonthHistoryItem extends GeneralHistoryItem<YearMonthHistoryItem, YearMonthPeriod, YearMonth> {
	
	/**
	 * Constructs.
	 * 
	 * @param historyId history ID
	 * @param period period
	 */
	public YearMonthHistoryItem(String historyId, YearMonthPeriod period) {
		super(historyId, period);
	}

}
