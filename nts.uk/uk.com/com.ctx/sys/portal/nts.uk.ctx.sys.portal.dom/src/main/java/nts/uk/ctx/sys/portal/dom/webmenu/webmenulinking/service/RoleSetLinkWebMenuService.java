/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.service;

import java.util.List;

import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenu;

/**
 * The Interface RoleSetLinkWebMenuService
 * @author HieuNV
 *
 */
public interface RoleSetLinkWebMenuService {

    /**
     * Insert a RoleSetLinkWebMenu - ロールセット別紐付け新規登録
     * @param domain
     */
    void createRoleSetLinkWebMenu(RoleSetLinkWebMenu domain);

    /**
     * アルゴリズム「ロールセット別紐付け新規登録」を実行する
     * @param companyId
     * @param roleSetCd
     * @param webMenuCds
     */
     void executeRegister(String companyId, String roleSetCd, List<String> webMenuCds);

    /**
     * @param listRoleSetLinkWebMenu
     */
    void createAllRoleSetLinkWebMenu(List<RoleSetLinkWebMenu> listRoleSetLinkWebMenu);

    /**
     * Update the RoleSetLinkWebMenu - ロールセット別紐付け更新登録
     * @param domain
     */
    void updateRoleSetLinkWebMenu(RoleSetLinkWebMenu domain);

    /**
     * アルゴリズム「更新登録」を実行する - Execute algorithm "update registration"
     * @param companyId
     * @param roleSetCd
     * @param webMenuCds
     */
    void executeUpdate(String companyId, String roleSetCd, List<String> webMenuCds);

    /**
     * Delete the RoleSetLinkWebMenu - ロールセット別紐付け削除
     * Company Id is login user's company id
     * @param roleSetCd
     */
    void deleteRoleSetLinkWebMenuByRoleCd(String roleSetCd);
}
