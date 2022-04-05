package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.Webメニュー.メニュー.メニュー分類
 */
public enum MenuClassification {

	/**0:標準 */
	STANDARD(0),
	/**1:任意項目申請 */
	OPTIONAL_ITEM_APP(1),
	/**2:携帯 */
	MOBILE_PHONE(2),
	/**3:タブレット */
	TABLET(3),
	/**4:コード名称 */
	CODE_NAME(4),
	/**5:グループ会社メニュー */
	GROUP_COMPANY_MENU(5),
	/**6:カスタマイズ */
	CUSTOMIZE(6),
	/**7:オフィスヘルパー稟議書*/
	OFFICE_HELPER(7),
	/**8:トップページ*/
	TOP_PAGE(8),
	/**9:スマートフォン*/
	SMART_PHONE(9);
	
	public int value;

	private MenuClassification(int value) {
		this.value = value;
	}
}
