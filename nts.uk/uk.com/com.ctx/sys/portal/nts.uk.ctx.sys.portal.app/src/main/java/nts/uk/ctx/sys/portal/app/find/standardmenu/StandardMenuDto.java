package nts.uk.ctx.sys.portal.app.find.standardmenu;

import lombok.Data;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;

/**
 * The Class StandardMenuDto.
 */
@Data
public class StandardMenuDto {
	/** The company id. */
	private String companyId;
	
	/** The menu code. */
	private String code;

	/** The Target Items. */
	private String targetItems;
	
	/** The Display Name. */
	private String displayName;
	
	/** The Display Order. */
	private int displayOrder;
	
	/** The menuAtr. */
	private int menuAtr;
	
	/** The url. */
	private String url;
	
	/** The system. */
	private int system;
	
	/** The classification. */
	private int classification;
	
	/** The webMenuSetting. */
	private int webMenuSetting;
	
	/** The afterLoginDisplay. */
	private int afterLoginDisplay;
	
	/**
	 * ログイン履歴表示区分
	 */
	private int logLoginDisplay;
	
	/**
	 * 起動履歴表示区分
	 */
	private int logStartDisplay;
	
	/**
	 * 修正履歴表示区分
	 */
	private int logUpdateDisplay;
	
	/**
	 * ログ設定表示
	 */
	private LogSettingDisplayDto logSettingDisplay;
	
	/** Query string */
	private String queryString;
	
	/**
	 * From domain.
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
	public static StandardMenuDto fromDomain(StandardMenu standardMenu) {
		StandardMenuDto standardMenuDto = new StandardMenuDto();
		standardMenuDto.companyId = standardMenu.getCompanyId();
		standardMenuDto.code = standardMenu.getCode().v();
		standardMenuDto.targetItems = standardMenu.getTargetItems();
		standardMenuDto.displayName = standardMenu.getDisplayName().v();
		standardMenuDto.displayOrder = standardMenu.getDisplayOrder();
		standardMenuDto.menuAtr = standardMenu.getMenuAtr().value;
		standardMenuDto.url = standardMenu.getUrl();
		standardMenuDto.system = standardMenu.getSystem().value;
		standardMenuDto.classification = standardMenu.getClassification().value;
		standardMenuDto.webMenuSetting = standardMenu.getWebMenuSetting().value;
		standardMenuDto.afterLoginDisplay = standardMenu.getAfterLoginDisplay();
		standardMenuDto.logSettingDisplay = LogSettingDisplayDto.fromDomain(standardMenu.getLogSettingDisplay());
		standardMenuDto.queryString = standardMenu.getQueryString();
		return standardMenuDto;
	}
}
