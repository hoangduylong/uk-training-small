package nts.uk.ctx.sys.portal.app.find.webmenu.detail;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Web menu details.
 */
@Data
@AllArgsConstructor
public class WebMenuDetailDto {
	
	/**
	 * Company Id 
	 */
	private String companyId;

	/**
	 * Web menu code
	 */
	private String webMenuCode;

	/**
	 * Web menu name
	 */
	private String webMenuName;

	/**
	 * Default menu
	 */
	private int defaultMenu;

	/**
	 * Menu bar
	 */
	private List<MenuBarDetailDto> menuBar;
}
