package nts.uk.ctx.sys.portal.app.find.webmenu.detail;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Title bar details.
 */
@Data
@AllArgsConstructor
public class TitleBarDetailDto {
	
	/**
	 * Title menu Id 
	 */
	private String titleMenuId;
	
	/**
	 * Title menu name
	 */
	private String titleMenuName;

	/**
	 * Background color
	 */
	private String backgroundColor;

	/**
	 * Image file
	 */
	private String imageFile;

	/**
	 * Text color
	 */
	private String textColor;

	/**
	 * Title menu attr
	 */
	private int titleMenuAtr;

	/**
	 * Title menu code
	 */
	private String titleMenuCode;

	/**
	 * Display order
	 */
	private int displayOrder;

	/**
	 * Tree menu
	 */
	private List<TreeMenuDetailDto> treeMenu;
}
