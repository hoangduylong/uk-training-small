package nts.uk.ctx.sys.portal.pubimp.webmenu.webmenulinking;

import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleByRoleTiesRepository;
import nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking.RoleByRoleTiesExport;
import nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking.RoleByRoleTiesPub;
import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Optional;

/**
 * The Class RoleByRoleTiesPubImp.
 * @author PhucTC
 */
@Stateless
public class RoleByRoleTiesPubImp implements RoleByRoleTiesPub {
    @Inject
    private RoleByRoleTiesRepository mRoleByRoleTiesRepository;

    @Override
    public Optional<RoleByRoleTiesExport> findByWebCodeByRoleId(String roleId) {
        String cid = AppContexts.user().companyId();
        return mRoleByRoleTiesRepository.getByRoleIdAndCompanyId(cid,roleId).map(x -> {
            return new RoleByRoleTiesExport(x.getRoleId(),x.getWebMenuCd().v(),x.getCompanyId());
        });
    }
}
