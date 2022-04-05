package nts.uk.ctx.bs.person.pub.anniversary;

import java.util.Map;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface AnniversaryNoticePub.
 */
public interface AnniversaryNoticePub {
	
	/**
	 * 期間で記念日情報を取得する.
	 *
	 * @param datePeriod the date period
	 * @return Map<AnniversaryNoticeExport, Boolean>
	 */
	public Map<AnniversaryNoticeExport, Boolean> setFlag(DatePeriod datePeriod);
	
	
	/**
	 * Checks if is today have new anniversary.
	 *	
	 * @return true, if is today have new anniversary
	 */
	public boolean isTodayHaveNewAnniversary();
}
