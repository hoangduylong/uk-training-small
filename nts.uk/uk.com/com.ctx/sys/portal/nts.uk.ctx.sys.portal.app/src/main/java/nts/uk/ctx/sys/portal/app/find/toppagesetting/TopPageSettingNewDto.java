package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Data;

@Data
public class TopPageSettingNewDto {

	/** 会社ID */
	private String cid;

	/** リロード間隔 */
	private Integer reloadInterval;
	
	/** 
	 * The top menu code.
	 * 	トップメニューコード
	 **/
	private String topMenuCode;
	
	/** 
	 * The switching date. 
	 * 	切換日
	 **/
	private Integer switchingDate;
	
	/** 
	 * The system. 
	 *	 システム
	 **/
	private Integer system;
	
	/**
	 * 	メニュー分類
	 */
	private Integer menuClassification;
	
	/** 
	 * The login menu code. 
	 * 	ログインメニューコード 
	 **/
	private String loginMenuCode;
}
