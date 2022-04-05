package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.Webメニュー.メニュー.システム/ System
 */
public enum System {
	
	/** 0.共通 */
	COMMON(0),
	/** 1.勤次郎 */
	KINJIROU(1),
	/** 2.オフィスヘルパー */
	OFFICE_HELPER(2),
	/** 3.Ｑ太郎 */
	Q_TARO(3),
	/** 4.人事郎 */
	JINJIROU(4);
	
	public int value;

	private System(int value) {
		this.value = value;
	}
}
