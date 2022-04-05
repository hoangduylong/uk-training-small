/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking;

import java.util.List;
import java.util.Optional;

/**
 * ロールセット別紐付け - - Interface DefaultRoleSetRepository
 * @author HieuNV
 */
public interface RoleSetLinkWebMenuRepository {

    /**
     * Get a RoleSetAndWebMenu by key
     * @param companyId
     * @param roleSetCd
     * @param webMenuCd
     * @return
     */
     Optional<RoleSetLinkWebMenu> findByKey(String companyId, String roleSetCd, String webMenuCd);

     /**
      * Find all by company id and roleSetCode.
      * @param companyId
      * @param roleSetCd
      * @return
      */
     List<RoleSetLinkWebMenu> findByRoleSetCd(String companyId, String roleSetCd);
     
     /**
      * Get all RoleSetLinkWebMenu by list of Role set code
      * @param companyId
      * @param roleSetCds
      * @return
      */
     List<RoleSetLinkWebMenu> findByListRoleSetCd(String companyId, List<String> roleSetCds);

    /**
     * Find all by company id.
     *
     * @param companyId
     * @return
     */
    List<RoleSetLinkWebMenu> findByCompanyId(String companyId);

    /**
     * Insert a RoleSetAndWebMenu
     * @param domain
     */
    void insert(RoleSetLinkWebMenu domain);

    /**
     * Insert List of Role Set Link Web Menu
     * @param domain
     */
    void insert(List<RoleSetLinkWebMenu> listDomain);

    /**
     * Update the RoleSetAndWebMenu
     * @param domain
     */
    void update(RoleSetLinkWebMenu domain);

    /**
     * Delete the RoleSetAndWebMenu
     * @param roleSetCd
     * @param companyId
     */
    void deleteAllByRoleCd(String companyId, String roleSetCd);

    /**
     * Delete the RoleSetAndWebMenu
     * @param companyId
     * @param roleSetCd
     * @param webMenuCode
     */
    void deleteAllByRoleCd(String companyId, String roleSetCd, String webMenuCode);
}
