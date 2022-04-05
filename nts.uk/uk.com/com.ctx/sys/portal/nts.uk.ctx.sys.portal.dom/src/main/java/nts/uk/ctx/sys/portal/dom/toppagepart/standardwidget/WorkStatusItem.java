package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.標準ウィジェット.勤務状況の項目
 * 
 * @author tutt
 *
 */
public enum WorkStatusItem {

	/**
	 * 1 - 特休残数
	 */
	HDSP1_DISPLAY_ATR(1, "特休残数1"),
	
	/**
	 * 2 - 特休残数
	 */
	HDSP2_DISPLAY_ATR(2, "特休残数2"),
	
	/**
	 * 3 - 特休残数
	 */
	HDSP3_DISPLAY_ATR(3, "特休残数3"),
	
	/**
	 * 4 - 特休残数
	 */
	HDSP4_DISPLAY_ATR(4, "特休残数4"),
	
	/**
	 * 5 - 特休残数
	 */
	HDSP5_DISPLAY_ATR(5, "特休残数5"),
	
	/**
	 * 6 - 特休残数
	 */
	HDSP6_DISPLAY_ATR(6, "特休残数6"),
	
	/**
	 * 7 - 特休残数
	 */
	HDSP7_DISPLAY_ATR(7, "特休残数7"),
	
	/**
	 * 8 - 特休残数
	 */
	HDSP8_DISPLAY_ATR(8, "特休残数8"),
	
	/**
	 * 9 - 特休残数
	 */
	HDSP9_DISPLAY_ATR(9, "特休残数9"),
	
	/**
	 * 10 - 特休残数
	 */
	HDSP10_DISPLAY_ATR(10, "特休残数10"),
	
	/**
	 * 11 - 特休残数
	 */
	HDSP11_DISPLAY_ATR(11, "特休残数11"),
	
	/**
	 * 12 - 特休残数
	 */
	HDSP12_DISPLAY_ATR(12, "特休残数12"),
	
	/**
	 * 13 - 特休残数
	 */
	HDSP13_DISPLAY_ATR(13, "特休残数13"),
	
	/**
	 * 14 - 特休残数
	 */
	HDSP14_DISPLAY_ATR(14, "特休残数14"),
	
	/**
	 * 15 - 特休残数
	 */
	HDSP15_DISPLAY_ATR(15, "特休残数15"),
	
	/**
	 * 16 - 特休残数
	 */
	HDSP16_DISPLAY_ATR(16, "特休残数16"),
	
	/**
	 * 17 - 特休残数
	 */
	HDSP17_DISPLAY_ATR(17, "特休残数17"),
	
	/**
	 * 18 - 特休残数
	 */
	HDSP18_DISPLAY_ATR(18, "特休残数18"),
	
	/**
	 * 19 - 特休残数
	 */
	HDSP19_DISPLAY_ATR(19, "特休残数19"),
	
	/**
	 * 20 - 特休残数
	 */
	HDSP20_DISPLAY_ATR(20, "特休残数20"),
	
	/**
	 * 21 - 日別実績のエラー
	 */
	DAY_ERR_DISPLAY_ATR(21, "日別実績のエラー"),

	/**
	 * 22 - 残業時間
	 */
	OVERTIME_DISPLAY_ATR(22, "残業時間"),

	/**
	 * 23 - フレックス時間
	 */
	FLEX_DISPLAY_ATR(23, "フレックス時間"),

	/**
	 * 24 - 就業時間外深夜時間
	 */
	NIGTH_DISPLAY_ATR(24, " 就業時間外深夜時間"),

	/**
	 * 25 - 休日出勤時間
	 */
	HDTIME_DISPLAY_ATR(25, "休日出勤時間"),

	/**
	 * 26 - 遅刻早退回数
	 */
	LATECOUNT_DISPLAY_ATR(26, "遅刻早退回数"),

	/**
	 * 27 - 年休残数
	 */
	HDPAID_DISPLAY_ATR(27, "年休残数"),

	/**
	 * 28 - 積立年休残数
	 */
	HDSTK_DISPLAY_ATR(28, "積立年休残数"),

	/**
	 * 29 - 代休残数
	 */
	HDCOM_DISPLAY_ATR(29, "代休残数"),

	/**
	 * 30 - 振休残数
	 */
	HDSUB_DISPLAY_ATR(30, "振休残数"),

	/**
	 * 31 - 子の看護残数
	 */
	CHILD_CARE_DISPLAY_ATR(31, "子の看護残数"),

	/**
	 * 32 - 介護残数
	 */
	CARE_DISPLAY_ATR(32, "介護残数");
	

	WorkStatusItem(int type, String name) {
		this.value = type;
		this.name = name;
	}

	public final int value;
	public final String name;
}
