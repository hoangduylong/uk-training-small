package nts.uk.ctx.sys.portal.dom.permissionmenu;

import java.util.List;

public interface PermissionSettingMenuRepository {
	List<PermissionSettingMenu> findbyRoleType (int roleType);
}
