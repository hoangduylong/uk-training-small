package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

/**
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG008_トップページ.A：トップページ.ユーザー固有情報.トップページ表示年月
 * 
 * @author tutt
 *
 */
public enum TopPageDisplayYearMonthEnum {
	
	/**
	 * 1. 当月表示
	 */
	THIS_MONTH_DISPLAY(1, "当月表示"),
	
	/**
	 * 2. 翌月表示
	 */
	NEXT_MONTH_DISPLAY(2, "翌月表示");
	
	public final int value;
	public final String name;

	private TopPageDisplayYearMonthEnum(int type, String name) {
		this.value = type;
		this.name = name;
	}
}
