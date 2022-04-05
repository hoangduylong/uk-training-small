package nts.uk.ctx.sys.portal.dom.layout;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.レイアウト.レイアウト（New）.ウィジェット種類
 * 
 * @author LienPTK
 *
 */
public enum WidgetType {
	/** あなたの申請状況 */
	YOUR_APPLICATION_STATUS(0),
	/** あなたの承認すべき内容 */
	WHAT_YOU_SHOULD_APPROVE(1),
	/** あなたの勤務状況 */
	YOUR_WORK_SITUATION(2),
	/** 時間外労働時間(従業員用) */
	OVERTIME_HOURS_FOR_EMPLOYEE(3),
	/** 時間外労働時間(上長用) */
	OVERTIME_HOURS_FOR_SUPERIORS(4),
	/** 打刻入力 */
	ENGRAVING(5),
	/** トップページアラーム */
	TOP_PAGE_ALARM(6),
	/** ミニ在席照会 */
	MINI_ATTENDANCE_INQUIRY(7);

	public final int value;

	/** The Constant values. */
	private final static WidgetType[] values = WidgetType.values();

	private WidgetType(int type) {
		this.value = type;
	}

	public static WidgetType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (WidgetType val : WidgetType.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
