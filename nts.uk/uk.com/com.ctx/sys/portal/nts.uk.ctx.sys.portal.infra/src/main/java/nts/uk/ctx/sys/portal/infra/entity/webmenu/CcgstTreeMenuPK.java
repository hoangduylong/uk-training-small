package nts.uk.ctx.sys.portal.infra.entity.webmenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * 
 * @author sonnh
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CcgstTreeMenuPK implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/** Company ID */
	@Column(name = "CID")
	public String companyID;
	
	/** Web menu code */
	@Column(name = "WEB_MENU_CD")
	public String webMenuCd;
	
	@Column(name = "TITLE_BAR_ID")
	public String titleMenuId;
		
	@Column(name = "MENU_BAR_ID")
	public String menuBarId;
	
	@Column(name = "DISPLAY_ORDER")
	public int displayOrder;

}
