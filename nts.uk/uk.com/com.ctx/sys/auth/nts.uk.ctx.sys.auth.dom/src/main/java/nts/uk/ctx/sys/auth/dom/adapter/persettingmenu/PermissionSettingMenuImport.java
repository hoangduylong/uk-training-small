package nts.uk.ctx.sys.auth.dom.adapter.persettingmenu;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
/**  権限設定メニュー */
public class PermissionSettingMenuImport {
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
