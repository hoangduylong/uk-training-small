package nts.uk.ctx.sys.portal.dom.generalsearch;

/**
 * The Class SearchCategory.
 * Enum 検索区分
 */
public enum SearchCategory {

	/** 
	 * Menu search
	 * メニュー検索 
	 **/
	MENU_SEARCH(0),
	/** Manual search
	 * マニュアル検索
	 **/
	MANUAL_SEARCH(1);
	
	public final int value;
	
	SearchCategory(int type) {
		this.value = type;
	}
}
