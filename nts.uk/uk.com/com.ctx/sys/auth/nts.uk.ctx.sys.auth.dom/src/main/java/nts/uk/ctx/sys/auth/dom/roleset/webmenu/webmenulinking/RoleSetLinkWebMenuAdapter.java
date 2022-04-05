/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking;

import java.util.List;

/**
 * The Interface WebMenuAdapter.
 * @author HieuNV
 */
public interface RoleSetLinkWebMenuAdapter {

    /**
     * Get all Web Menu that link by RoleSet. 
     * CompanyId is companyId of login user
     * @return
     */
    // RequestList #???
    List<RoleSetLinkWebMenuImport> findAllWebMenuByRoleSetCd(String roleSetCd);
    
    List<RoleSetLinkWebMenuImport> findAllWebMenuByListRoleSetCd(List<String> roleSetCds);
}
