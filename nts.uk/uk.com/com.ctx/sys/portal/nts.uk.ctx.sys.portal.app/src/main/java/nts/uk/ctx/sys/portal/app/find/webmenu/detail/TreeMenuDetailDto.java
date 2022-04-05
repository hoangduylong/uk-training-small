package nts.uk.ctx.sys.portal.app.find.webmenu.detail;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Tree menu details.
 */
@Data
@AllArgsConstructor
public class TreeMenuDetailDto {
	
	/**
	 * Code 
	 */
	private String code;

	/**
	 * Default name
	 */
	private String defaultName;
	
	/**
	 * Display name
	 */
	private String displayName;
	
	/**
	 * Url
	 */
	private String url;
	
	/**
	 * Display order
	 */
	private int displayOrder;

	/**
	 * System
	 */
	private int system;
	
	/**
	 * Separator line (0) or menu (1) 
	 */
	private int menuAttr;

	/**
	 * Classification
	 */
	private int classification;
	
	/**
	 * Display after login
	 */
	private int afterLoginDisplay;
	
	/**
	 * Program Id
	 */
	private String programId;
	
	/**
	 * Screen Id
	 */
	private String screenId;
	
	/**
	 * Query string
	 */
	private String queryString;
}
