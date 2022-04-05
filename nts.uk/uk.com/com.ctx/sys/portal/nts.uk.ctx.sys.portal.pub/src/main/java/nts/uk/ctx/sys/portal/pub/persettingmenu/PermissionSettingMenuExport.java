package nts.uk.ctx.sys.portal.pub.persettingmenu;

import lombok.Data;

@Data
/**  権限設定メニュー */
public class PermissionSettingMenuExport {
	/** メニューコード. */
	private String code;

	/**
	 * メニュー表示名称
	 */
	private String displayName;
	
	/**
	 * 画面ID
	 */
	private String screenId;
	
	/**
	 * プログラムID
	 */
	private String programId;
	
	/**
	 * クエリ文字列
	 */
	private String queryString;
}
