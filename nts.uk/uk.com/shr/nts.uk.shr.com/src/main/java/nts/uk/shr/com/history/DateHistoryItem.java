package nts.uk.shr.com.history;

import nts.arc.time.GeneralDate;
import nts.gul.text.IdentifierUtil;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * Item of history that has a days period.
 * 年月日期間の汎用履歴項目
 */
public class DateHistoryItem extends GeneralHistoryItem<DateHistoryItem, DatePeriod, GeneralDate> {

	/**
	 * Constructs.
	 * 
	 * @param historyId history ID
	 * @param period period
	 */
	public DateHistoryItem(String historyId, DatePeriod period) {
		super(historyId, period);
	}
	
	/**
	 * 新しい履歴を作る
	 * @param period 期間
	 * @return
	 */
	public static DateHistoryItem createNewHistory(DatePeriod period) {
		return new DateHistoryItem(IdentifierUtil.randomUniqueId(), period);
	}

}
