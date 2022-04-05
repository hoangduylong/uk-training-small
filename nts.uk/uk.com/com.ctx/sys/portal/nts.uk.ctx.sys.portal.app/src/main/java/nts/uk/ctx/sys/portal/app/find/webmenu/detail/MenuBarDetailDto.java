package nts.uk.ctx.sys.portal.app.find.webmenu.detail;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * MenuBarDetailDto
 */
@Data
@AllArgsConstructor
public class MenuBarDetailDto {
	
	/**
	 * Menu bar Id 
	 */
	private String menuBarId;
	
	/**
	 * Code
	 */
	private String code;

	/**
	 * Menu bar name
	 */
	private String menuBarName;

	/**
	 * From tree or menu bar itself
	 */
	private int selectedAttr;
	
	/**
	 * Link to jump to when menu is selected directly
	 */
	private String link;

	/**
	 * System
	 */
	private int system;

	/**
	 * Menu classification
	 */
	private int menuCls;

	/**
	 * Display order
	 */
	private int displayOrder;

	/**
	 * Title menu
	 */
	private List<TitleBarDetailDto> titleMenu;
}
