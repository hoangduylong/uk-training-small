package nts.uk.ctx.sys.portal.dom.permissionmenu;

import lombok.Getter;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.standardmenu.MenuCode;
@Getter
public class PermissionSettingMenu {
	/** The menu code. */
	private MenuCode menuCode;
	/** The system. */
	private System system;
	/** The Menu classification. */
	private MenuClassification classification;
	
	private RoleType roleType;
	
	public PermissionSettingMenu(String code, int system, int classification, int roleType ){
		this.menuCode= new MenuCode(code);
		this.system = System.valueOf(system);
		this.classification = MenuClassification.valueOf(classification);
		this.roleType = RoleType.valueOf(roleType);		
	}
}
