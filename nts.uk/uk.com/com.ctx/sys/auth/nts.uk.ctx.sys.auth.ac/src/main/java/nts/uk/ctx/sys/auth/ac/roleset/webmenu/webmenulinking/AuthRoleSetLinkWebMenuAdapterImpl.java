/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.ac.roleset.webmenu.webmenulinking;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking.RoleSetLinkWebMenuAdapter;
import nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking.RoleSetLinkWebMenuImport;
import nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking.RoleSetLinkWebMenuPub;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class WebMenuAdapImpl.
 * @author HieuNV
 */
@Stateless
public class AuthRoleSetLinkWebMenuAdapterImpl implements RoleSetLinkWebMenuAdapter {
    
    /** The web menu pub. */
    @Inject
    private RoleSetLinkWebMenuPub roleSetLinkWebMenuPub;

    @Override
    public List<RoleSetLinkWebMenuImport> findAllWebMenuByRoleSetCd(String roleSetCd) {
        return this.roleSetLinkWebMenuPub.findAllWebMenuByRoleSetCd(AppContexts.user().companyId(), roleSetCd).stream()
                .map(item -> new RoleSetLinkWebMenuImport(item.getCompanyId(), item.getRoleSetCd(), item.getWebMenuCode())
                ).collect(Collectors.toList());
    }

	@Override
	public List<RoleSetLinkWebMenuImport> findAllWebMenuByListRoleSetCd(List<String> roleSetCds) {
		return this.roleSetLinkWebMenuPub.findAllWebMenuByListRoleSetCd(AppContexts.user().companyId(), roleSetCds).stream()
                .map(item -> new RoleSetLinkWebMenuImport(item.getCompanyId(), item.getRoleSetCd(), item.getWebMenuCode())
                ).collect(Collectors.toList());
	}

}
