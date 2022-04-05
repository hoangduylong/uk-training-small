/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking;

import java.util.List;

/**
 * The Interface RoleSetLinkWebMenuPub.
 */
public interface RoleSetLinkWebMenuPub {
    
    /**
     * Get list of web menu by roleSetCd
     * @param companyId
     * @param roleSetCd
     * @return
     */
    List<RoleSetLinkWebMenuExport> findAllWebMenuByRoleSetCd(String companyId, String roleSetCd);
    List<RoleSetLinkWebMenuExport> findAllWebMenuByListRoleSetCd(String companyId, List<String> roleSetCds);
}
