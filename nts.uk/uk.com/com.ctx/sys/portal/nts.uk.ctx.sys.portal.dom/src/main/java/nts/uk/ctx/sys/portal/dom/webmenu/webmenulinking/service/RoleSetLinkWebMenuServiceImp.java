/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The class RoleSetLinkWebMenuService implement of RoleSetLinkWebMenuService
 * @author Hieu.NV
 *
 */
@Stateless
public class RoleSetLinkWebMenuServiceImp extends JpaRepository implements RoleSetLinkWebMenuService {

    @Inject
    private RoleSetLinkWebMenuRepository roleSetAndWebMenuRepository;

    @Override
    public void createRoleSetLinkWebMenu(RoleSetLinkWebMenu domain) {
        roleSetAndWebMenuRepository.insert(domain);
    }

    @Override
    public void updateRoleSetLinkWebMenu(RoleSetLinkWebMenu domain) {
        roleSetAndWebMenuRepository.update(domain);
    }

    @Override
    public void deleteRoleSetLinkWebMenuByRoleCd(String roleSetCd) {
        String companyId = AppContexts.user().companyId();
        roleSetAndWebMenuRepository.deleteAllByRoleCd(companyId, roleSetCd);
    }

    @Override
    public void createAllRoleSetLinkWebMenu(List<RoleSetLinkWebMenu> listRoleSetLinkWebMenu) {
        roleSetAndWebMenuRepository.insert(listRoleSetLinkWebMenu);
    }

    @Override
    public void executeRegister(String companyId, String roleSetCd, List<String> webMenuCds) {
        // pre-check : メニューが１件以上選択されていなければならない: Msg_583, メニュー
        if (CollectionUtil.isEmpty(webMenuCds)) {
            throw new BusinessException("Msg_583");
        }

        // register to web menu link - ドメインモデル「ロールセット別紐付け」を新規登録する
        List<RoleSetLinkWebMenu> listRoleSetLinkWebMenu = webMenuCds.stream()
                .map(webMenuCd -> new RoleSetLinkWebMenu(companyId
                        , roleSetCd
                        , webMenuCd)).collect(Collectors.toList());
        this.createAllRoleSetLinkWebMenu(listRoleSetLinkWebMenu);
    }

    @Override
    public void executeUpdate(String companyId, String roleSetCd, List<String> webMenuCds) {
        // update to web menu link - アルゴリズム「ロールセット別紐付け更新登録」を実行する 
        // step 1: delete all old web menu
        this.deleteRoleSetLinkWebMenuByRoleCd(roleSetCd);

        // step 2: register new role set link web menu
        // アルゴリズム「ロールセット別紐付け新規登録」を実行する 
        // - Execute the algorithm "register new link web menu by role set"
        this.executeRegister(companyId, roleSetCd, webMenuCds);
    }
}
