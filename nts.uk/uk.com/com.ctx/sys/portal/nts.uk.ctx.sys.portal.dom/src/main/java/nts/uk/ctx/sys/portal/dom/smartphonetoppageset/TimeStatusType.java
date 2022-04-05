package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;
/**
 * 勤怠状況種類
 * 
 * @author sonnh1
 *
 */
public enum TimeStatusType {
	/**
	 * 年休残数
	 */
	NUMBER_REMAINING_YEARS(1),
	/**
	 * 半日年休残数
	 */
	HALF_DAY_ANNUAL_REST_COUNT(2),
	/**
	 * 時間年休使用可上限
	 */
	HOURLY_ANNUAL_HOLIDAY_AVAI_LIMIT(3),
	/**
	 * 積立年休残数
	 */
	ACCUMULATED_ANNUAL_REST(4),
	/**
	 * 代休残数
	 */
	NUMBER_DAYS_LEFT(5),
	/**
	 * 振休残数
	 */
	REMNANT_NUMBER(6),
	/**
	 * 特休残数
	 */
	REMAINING_HOLIDAY(7),
	/**
	 * 60H超休残数
	 */
	EXCESS_NUMBER_REST_60H(8),
	/**
	 * 公休残数
	 */
	REMAINING_PUBLIC_HOLIDAY(9),
	/**
	 * 子の看護休暇残数
	 */
	CHILD_NURSING_LEAVE_REMAINING(10),
	/**
	 * 介護休暇残数
	 */
	REMAINING_CARE_LEAVE(11);
	
	public final int value;

	TimeStatusType(int value) {
		this.value = value;
	}
}
