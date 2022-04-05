package nts.uk.ctx.sys.portal.dom.toppagealarm;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページ.トップページ（New）.レイアウトの表示種類
 * 表示社員区分
 */
public enum DisplayAtr {
	/** 本人 */
	PRINCIPAL(0),
	
	/** 上長 */
	SUPERIOR(1),
	
	/** 担当者 */
	PIC(2);

	public final int value;

	private DisplayAtr(int type) {
		this.value = type;
	}
	
}
