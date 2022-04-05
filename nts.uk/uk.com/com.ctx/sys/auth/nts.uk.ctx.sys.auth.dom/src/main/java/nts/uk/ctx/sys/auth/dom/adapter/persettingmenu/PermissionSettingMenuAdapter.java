package nts.uk.ctx.sys.auth.dom.adapter.persettingmenu;

import java.util.List;

public interface PermissionSettingMenuAdapter {
	List<PermissionSettingMenuImport> findByRoleType(int roleType);
}
