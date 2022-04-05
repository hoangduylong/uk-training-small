/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.pubimp.webmenu.webmenulinking;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.service.RoleSetLinkWebMenuService;
import nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking.RoleSetLinkWebMenuExport;
import nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking.RoleSetLinkWebMenuPub;

/**
 * The Class WebmenuPubImp.
 * @author HieuNV
 */
@Stateless
public class RoleSetWebMenuPubImp implements RoleSetLinkWebMenuPub {

    /** The role set and web menu link repository. */
    @Inject
    private RoleSetLinkWebMenuRepository roleSetAndWebMenuRepository;
    
    @Inject RoleSetLinkWebMenuService roleSetAndWebMenuService;

    @Override
    public List<RoleSetLinkWebMenuExport> findAllWebMenuByRoleSetCd(String companyId, String roleSetCd) {
        return roleSetAndWebMenuRepository.findByRoleSetCd(companyId, roleSetCd).stream()
                .map(item -> new RoleSetLinkWebMenuExport(
                        item.getCompanyId()
                        , item.getRoleSetCd().v()
                        , item.getWebMenuCd().v()
                        )
                    )
                .collect(Collectors.toList());
    }

	@Override
	public List<RoleSetLinkWebMenuExport> findAllWebMenuByListRoleSetCd(String companyId, List<String> roleSetCds) {
		return roleSetAndWebMenuRepository.findByListRoleSetCd(companyId, roleSetCds).stream()
                .map(item -> new RoleSetLinkWebMenuExport(
                        item.getCompanyId()
                        , item.getRoleSetCd().v()
                        , item.getWebMenuCd().v()
                        )
                    )
                .collect(Collectors.toList());
	}
}
