package nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking;

import java.util.Optional;

public interface RoleByRoleTiesPub {
    /**
     * Get WebCode of web menu by Role ID
     * @param roleId
     * @return
     */
    Optional<RoleByRoleTiesExport> findByWebCodeByRoleId(String roleId);
}
