package nts.uk.ctx.sys.portal.infra.repository.permissionsettingmenu;

import java.util.List;
import javax.ejb.Stateless;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.permissionmenu.PermissionSettingMenu;
import nts.uk.ctx.sys.portal.dom.permissionmenu.PermissionSettingMenuRepository;
import nts.uk.ctx.sys.portal.infra.entity.permissionsettingmenu.SptmtPerSettingMenu;

@Stateless
public class JpaPermissionSettingMenuRepository extends JpaRepository implements PermissionSettingMenuRepository {

	private static final String FIND_BY_ROLE_TYPE = "SELECT s FROM SptmtPerSettingMenu s WHERE s.roleType = :roleType ";

	@Override
	public List<PermissionSettingMenu> findbyRoleType(int roleType) {
		return this.queryProxy().query(FIND_BY_ROLE_TYPE, SptmtPerSettingMenu.class).setParameter("roleType", roleType)
				.getList(e -> toDomain(e));
	}

	private PermissionSettingMenu toDomain(SptmtPerSettingMenu entity) {
		return new PermissionSettingMenu(entity.sptmtPerSettingMenuPK.menuCode, entity.sptmtPerSettingMenuPK.system,
				entity.sptmtPerSettingMenuPK.classification, entity.roleType);
	}
}
