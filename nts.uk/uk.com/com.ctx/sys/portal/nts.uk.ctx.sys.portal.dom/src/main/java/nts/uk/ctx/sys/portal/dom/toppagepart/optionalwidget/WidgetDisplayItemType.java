package nts.uk.ctx.sys.portal.dom.toppagepart.optionalwidget;

import lombok.AllArgsConstructor;

//選択ウィジェット種類
@AllArgsConstructor
public enum WidgetDisplayItemType {

	/** OverTime Work Number 残業指示件数 */
	OVERTIME_WORK_NO(0, "残業指示件数"),

	/** Instructions Holiday Number 休出指示件数 */
	INSTRUCTION_HD_NO(1, "休出指示件数"),

	/** Approved Number 承認された件数 */
	APPROVED_NO(2, "承認された件数"),

	/** Unapproved Number 未承認件数 */
	UNAPPROVED_NO(3, "未承認件数"),

	/** Denied Number 否認された件数 */
	DENIED_NO(4, "否認された件数"),

	/** Remand Number 差し戻し件数 */
	REMAND_NO(5, "差し戻し件数"),

	/** App Deadline Month 今月の申請締め切り日 */
	APP_DEADLINE_MONTH(6, "今月の申請締め切り日"),

	/** Presence Daily Per 日別実績のエラー有無 */
	PRESENCE_DAILY_PER(7, "日別実績のエラー有無"),

	/** ReferWorkRecord 勤務実績参照 */
	REFER_WORK_RECORD(8, "勤務実績参照"),

	/** Overtime Hours 残業時間 */
	OVERTIME_HOURS(9, "残業時間"),

	/** Flex Time フレックス時間 */
	FLEX_TIME(10, "フレックス時間"),

	/** Rest Time 休出時間 */
	REST_TIME(11, "休出時間"),

	/** Night Work Hours 就業時間外深夜時間 */
	NIGHT_WORK_HOURS(12, "就業時間外深夜時間"),

	/** Late Or Early Retreat 遅刻/早退回数 */
	LATE_OR_EARLY_RETREAT(13, "遅刻/早退回数"),

	/** Yearly Holiday 年休残数 */
	YEARLY_HD(14, "年休残数"),

	/** HaftDayOff 半日年休残数 */
	HAFT_DAY_OFF(15, "半日年休残数"),

	/** Hours of holiday Available Upper limit 時間年休使用可上限 */
	HOURS_OF_HOLIDAY_UPPER_LIMIT(16, "時間年休使用可上限"),

	/** Reserved Years Remain Number 積立年休残数 */
	RESERVED_YEARS_REMAIN_NO(17, "積立年休残数"),

	/** Planned Year Holiday 計画年休 */
	PLANNED_YEAR_HOLIDAY(18, "計画年休"),

	/** Remain Alternation Number 代休残数 */
	REMAIN_ALTERNATION_NO(19, "代休残数"),

	/** RemainsLeft 振休残数 */
	REMAINS_LEFT(20, "振休残数"),

	/** Public Holiday Number 公休残数 */
	PUBLIC_HD_NO(21, "公休残数"),

	/** Holiday Remain Number 子の看護休暇残数 */
	HD_REMAIN_NO(22, "子の看護休暇残数"),

	/** Care Leave Number 介護休暇残数 */
	CARE_LEAVE_NO(23, "介護休暇残数"),

	/** Special Holiday Remain Number 特休残数 */
	SPHD_RAMAIN_NO(24, "特休残数"),

	/** SixtyHExtraRest ６０Ｈ超休残数 */
	SIXTYH_EXTRA_REST(25, "６０Ｈ超休残数");

	public final int value;

	public final String nameId;

	/** The Constant values. */
	private final static WidgetDisplayItemType[] values = WidgetDisplayItemType.values();

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the top page part type
	 */
	public static WidgetDisplayItemType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (WidgetDisplayItemType val : WidgetDisplayItemType.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
}
