package nts.uk.ctx.sys.portal.pub.persettingmenu;

import java.util.List;

/**
 * @author dxthuong
 *
 * Request list 117
 */
public interface PermissionSettingMenuPub {
	
	List<PermissionSettingMenuExport> findByRoleType(int roleType);
}
