package nts.uk.ctx.sys.portal.dom.standardmenu;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.enums.MenuAtr;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.enums.WebMenuSetting;

/**
 * 標準メニュー
 * The Class StandardMenu.
 */
@Getter
@EqualsAndHashCode(callSuper = false)
public class StandardMenu extends AggregateRoot {
	
	/** The company id. */
	private String companyId;
	
	/** The menu code. */
	private MenuCode code;

	/** The Target Items. */
	@Setter
	private String targetItems;
	
	/** The Display Name. */
	@Setter
	private MenuDisplayName displayName;
	
	/** The Display Order. */
	private int displayOrder;
	
	/** The menuAtr. */
	private MenuAtr menuAtr;
	
	/** The url. */
	private String url;
	
	/** The system. */
	private System system;
	
	/** The Menu classification. */
	private MenuClassification classification;
	
	/** The webMenuSetting. */
	private WebMenuSetting webMenuSetting;
	
	/** The afterLoginDisplay. */
	private int afterLoginDisplay;
	
	/** プログラムID **/
	private String programId;
	
	/** 遷移先の画面ID **/
	private String screenId;
	
	/** Query string */
	private String queryString;
	
	/**
	 * ログ設定表示
	 */
	private LogSettingDisplay logSettingDisplay;

	/**
	 * Instantiates a new Standard Menu.
	 *
	 * @param companyId the company Id
	 * @param code the menu code
	 * @param targetItems the target items
	 * @param displayName the display name
	 * @param displayOrder the displayOrder
	 * @param menuAtr the menuAtr
	 * @param url the url
	 * @param system the system
	 * @param classification the classification
	 * @param webMenuSetting the webMenuSetting
	 * @param afterLoginDisplay the afterLoginDisplay
	 * @param logSettingDisplay the logSettingDisplay
	 */
	public StandardMenu(String companyId, MenuCode code, String targetItems, MenuDisplayName displayName, int displayOrder,
			MenuAtr menuAtr, String url, System system, MenuClassification classification, WebMenuSetting webMenuSetting,
			int afterLoginDisplay, String programId, String screenId, String queryString,
			int logLoginDisplay, int logStartDisplay, int logUpdateDisplay) {
		
		this.companyId = companyId;
		this.code = code;
		this.targetItems = targetItems;
		this.displayName = displayName;
		this.displayOrder = displayOrder;
		this.menuAtr = menuAtr;
		this.url = url;
		this.system = system;
		this.classification = classification;
		this.webMenuSetting = webMenuSetting;
		this.afterLoginDisplay = afterLoginDisplay;
		this.programId = programId;
		this.screenId = screenId;
		this.queryString = queryString;
		this.logSettingDisplay = new LogSettingDisplay(logLoginDisplay, logStartDisplay, logUpdateDisplay);
	}
	
	public StandardMenu(String companyId, MenuClassification classification, MenuCode code, MenuDisplayName displayName,
			System system) {
		this.companyId = companyId;
		this.classification = classification;
		this.code = code;
		this.displayName = displayName;
		this.system = system;
	}
	
	/**
	 * author: yennth update displayName
	 * 
	 * @param companyId
	 * @param classification
	 * @param code
	 * @param displayName
	 * @param system
	 * @return
	 */
	public static StandardMenu updateName(String companyId, int classification, String code, String displayName,
			int system) {
		return new StandardMenu(companyId, EnumAdaptor.valueOf(classification, MenuClassification.class),
				new MenuCode(code), new MenuDisplayName(displayName), EnumAdaptor.valueOf(system, System.class));
	}

	/**
	 * 
	 * @param companyId
	 * @param code
	 * @param targetItems
	 * @param displayName
	 * @param displayOrder
	 * @param menuAtr
	 * @param url
	 * @param system
	 * @param classification
	 * @param webMenuSetting
	 * @param afterLoginDisplay
	 * @param programId
	 * @param screenId
	 * @param queryString
	 * @param logLoginDisplay
	 * @param logStartDisplay
	 * @param logUpdateDisplay
	 * @return
	 */
	public static StandardMenu createFromJavaType(String companyId, String code, String targetItems, String displayName,
			int displayOrder, int menuAtr, String url, int system, int classification, int webMenuSetting,
			int afterLoginDisplay, String programId, String screenId, String queryString,
			int logLoginDisplay, int logStartDisplay, int logUpdateDisplay) {
		return new StandardMenu(companyId, new MenuCode(code), targetItems, new MenuDisplayName(displayName),
				displayOrder, EnumAdaptor.valueOf(menuAtr, MenuAtr.class), url,
				EnumAdaptor.valueOf(system, System.class),
				EnumAdaptor.valueOf(classification, MenuClassification.class),
				EnumAdaptor.valueOf(webMenuSetting, WebMenuSetting.class), afterLoginDisplay, programId, screenId,
				queryString, logLoginDisplay, logStartDisplay, logUpdateDisplay);
	}

	/**
	 * 
	 * @param 会社ID:                               companyId
	 * @param システム:                               system
	 * @param メニュー分類 :                            classification
	 * @param 画面ID:                               screenId
	 * @param クエリ文字列:                            queryString
	 * @param プログラムID:                            programId
	 * @param コード:                                 code
	 * @param 対象項目:                              targetItems
	 * @param 表示名称:                              displayName
	 * @param 表示順:                                displayOrder
	 * @param メニュー属性:                             menuAtr
	 * @param URL:                                  url
	 * @param Webメニュー設定表示区分:                   webMenuSetting
	 * @param ログイン後表示区分:                        afterLoginDisplay
	 * @param ログ設定表示．ログイン履歴記録表示区分:        logLoginDisplay
	 * @param ログ設定表示．起動履歴記録表示区分:          logStartDisplay
	 * @param ログ設定表示．修正履歴（データ）記録表示区分:    logUpdateDisplay
	 * @return
	 */
	public static StandardMenu toNewDomain(String companyId, int system, int classification, String screenId, String queryString,
			String programId, String code, String targetItems, String displayName,
			int displayOrder, int menuAtr, String url,  int webMenuSetting,
			int afterLoginDisplay, int logLoginDisplay, int logStartDisplay, int logUpdateDisplay) {
		return new StandardMenu(companyId, new MenuCode(code), targetItems, new MenuDisplayName(displayName),
				displayOrder, EnumAdaptor.valueOf(menuAtr, MenuAtr.class), url,
				EnumAdaptor.valueOf(system, System.class),
				EnumAdaptor.valueOf(classification, MenuClassification.class),
				EnumAdaptor.valueOf(webMenuSetting, WebMenuSetting.class), afterLoginDisplay, programId, screenId,
				queryString, logLoginDisplay, logStartDisplay, logUpdateDisplay);
	}
	
	public void setDataItem(String queryString, String code, String targetItems, String displayName) {
		this.queryString = queryString;
		this.code = new MenuCode(code);
		this.targetItems = targetItems;
		this.displayName = new MenuDisplayName(displayName);
	}
}
