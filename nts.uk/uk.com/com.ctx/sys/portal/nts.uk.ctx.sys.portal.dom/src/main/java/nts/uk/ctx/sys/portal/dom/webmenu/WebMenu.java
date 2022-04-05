package nts.uk.ctx.sys.portal.dom.webmenu;

import java.util.List;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.error.BusinessException;
import nts.arc.layer.dom.AggregateRoot;
import nts.gul.text.StringUtil;
/**
 * 
 * domain : Webメニュー
 *
 */
@Getter
public class WebMenu extends AggregateRoot {

	/**
	 * 会社ID
	 */
	private String companyId;

	/**
	 * Webメニューコード
	 */

	private WebMenuCode webMenuCode;

	/**
	 * Webメニュー名称
	 */

	private WebMenuName webMenuName;

	/**
	 * 既定メニュー
	 */

	private DefaultMenu defaultMenu;

	/**
	 * メニューバー
	 */

	private List<MenuBar> menuBars;
	
	
	public static WebMenu createFromJavaType(String companyId, String webMenuCode, String webMenuName, int defaultMenu, List<MenuBar> menuBars) {
		return new WebMenu(
				companyId,
				new WebMenuCode(webMenuCode),
				new WebMenuName(webMenuName),
				EnumAdaptor.valueOf(defaultMenu, DefaultMenu.class),
				menuBars);
	}

	public WebMenu(String companyId, WebMenuCode webMenuCode, WebMenuName webMenuName, DefaultMenu defaultMenu,
			List<MenuBar> menuBars) {
		super();
		this.companyId = companyId;
		this.webMenuCode = webMenuCode;
		this.webMenuName = webMenuName;
		this.defaultMenu = defaultMenu;
		this.menuBars = menuBars;
	}
	
	
	@Override
	public void validate() {
		super.validate();
		if (this.webMenuCode == null || StringUtil.isNullOrEmpty(this.webMenuCode.v(), true)) {
			throw new BusinessException("Msg_86");
		}
		
		if (this.webMenuName == null || StringUtil.isNullOrEmpty(this.webMenuName.v(), true)) {
			throw new BusinessException("Msg_86");
		}
	}
	
	/**
	 * Check web menu is default
	 * @return true is default else false
	 */
	public boolean isDefault() {
		return this.defaultMenu.equals(DefaultMenu.DefaultMenu);
	}
}
