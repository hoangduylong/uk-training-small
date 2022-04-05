package nts.uk.ctx.sys.auth.ac.persettingmenu;

import java.util.List;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.uk.ctx.sys.auth.dom.adapter.persettingmenu.PermissionSettingMenuAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.persettingmenu.PermissionSettingMenuImport;
import nts.uk.ctx.sys.portal.pub.persettingmenu.PermissionSettingMenuPub;

@Stateless
public class AuthPermissionSettingMenuImpl implements PermissionSettingMenuAdapter {
	@Inject
	private PermissionSettingMenuPub permissionSettingMenuPub;

	@Override
	public List<PermissionSettingMenuImport> findByRoleType(int roleType) {

		return permissionSettingMenuPub
				.findByRoleType(roleType).stream().map(e -> new PermissionSettingMenuImport(e.getCode(),
						e.getDisplayName(), e.getScreenId(), e.getProgramId(), e.getQueryString()))
				.collect(Collectors.toList());
	}

}
