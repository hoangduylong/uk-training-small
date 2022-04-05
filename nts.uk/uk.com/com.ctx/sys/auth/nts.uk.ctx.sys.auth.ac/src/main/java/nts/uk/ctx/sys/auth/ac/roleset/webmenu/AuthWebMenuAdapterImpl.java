/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.ac.roleset.webmenu;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.roleset.webmenu.WebMenuAdapter;
import nts.uk.ctx.sys.auth.dom.roleset.webmenu.WebMenuImport;
import nts.uk.ctx.sys.portal.pub.webmenu.WebMenuPub;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class WebMenuAdapImpl.
 * @author HieuNV
 */
@Stateless
public class AuthWebMenuAdapterImpl implements WebMenuAdapter {
    
    /** The web menu pub. */
    @Inject
    private WebMenuPub webMenuPub;

    @Override
    public List<WebMenuImport> findByCompanyId() {
        return this.webMenuPub.findByCompanyId(AppContexts.user().companyId()).stream()
                .map(item -> new WebMenuImport(item.getCompanyId(), item.getWebMenuCode(),
                        item.getWebMenuName(), item.isDefaultMenu())
            ).collect(Collectors.toList());
    }
}
