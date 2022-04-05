package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.横の位置
 */
public enum HorizontalPosition {
	
	//左揃え
	LEFT(0),
	//中央揃え
	CENTER(1),
	//右揃え
	RIGHT(2);
	
	public int value;

	private HorizontalPosition(int value) {
		this.value = value;
	}
}
