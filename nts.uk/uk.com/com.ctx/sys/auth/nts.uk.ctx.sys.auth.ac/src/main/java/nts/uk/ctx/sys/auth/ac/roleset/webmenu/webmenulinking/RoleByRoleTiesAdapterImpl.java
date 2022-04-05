package nts.uk.ctx.sys.auth.ac.roleset.webmenu.webmenulinking;

import nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking.RoleByRoleAdapter;
import nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking.RoleByRoleTiesImport;
import nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking.RoleByRoleTiesPub;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Optional;

@Stateless
public class RoleByRoleTiesAdapterImpl implements RoleByRoleAdapter {
    @Inject
    private RoleByRoleTiesPub mRoleByRoleTiesPub;
    @Override
    public Optional<RoleByRoleTiesImport> findByWebCodeByRoleId(String roleId) {
        return mRoleByRoleTiesPub.findByWebCodeByRoleId(roleId).map(x -> new RoleByRoleTiesImport(x.getRoleId(),x.getWebMenuCd(),x.getCompanyId()));
    }
}
