package nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking;

import java.util.Optional;

public interface RoleByRoleAdapter {
    /**
     * Get WebCode of web menu by Role ID
     * @param roleId
     * @return
     */
    Optional<RoleByRoleTiesImport> findByWebCodeByRoleId(String roleId);
}
