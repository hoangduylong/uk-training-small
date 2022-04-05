package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.標準ウィジェット.申請状況ウィジェットの項目
 * 
 * @author tutt
 *
 */
public enum ApplicationStatusWidgetItem {
	/**
	 * 0 - 承認された件数
	 */
	APPROVED_NUMBER(0, "承認された件数"),

	/**
	 * 1 - 未承認件数
	 */
	UNAPPROVED_NUMBER(1, "未承認件数"),

	/**
	 * 2 - 否認された件数
	 */
	DENIED_NUMBER(2, "否認された件数"),

	/**
	 * 3 - 差し戻し件数
	 */
	REMAND_NUMBER(3, "差し戻し件数"),

	/**
	 * 4 - 今月の申請締め切り日
	 */
	MONTH_APP_DEADLINE(4, "今月の申請締め切り日");

	ApplicationStatusWidgetItem(int type, String name) {
		this.value = type;
		this.name = name;
	}

	public final int value;
	public final String name;
}
