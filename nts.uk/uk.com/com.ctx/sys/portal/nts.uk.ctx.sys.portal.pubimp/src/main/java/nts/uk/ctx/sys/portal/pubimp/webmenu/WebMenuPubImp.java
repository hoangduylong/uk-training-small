/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.pubimp.webmenu;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuRepository;
import nts.uk.ctx.sys.portal.pub.webmenu.WebMenuPub;
import nts.uk.ctx.sys.portal.pub.webmenu.ProgramNameDto;
import nts.uk.ctx.sys.portal.pub.webmenu.WebMenuExport;

/**
 * The Class WebmenuPubImp.
 * @author HieuNV
 */
@Stateless
public class WebMenuPubImp implements WebMenuPub {

    /** The WebMenuRepository. */
    @Inject
    private WebMenuRepository webMenuRepository;
    
    @Inject
    private StandardMenuRepository standardMenuRepository;

    @Override
    public List<WebMenuExport> findByCompanyId(String companyId) {
        return webMenuRepository.findAll(companyId).stream()
                .map(item -> new WebMenuExport(
                        item.getWebMenuCode().v()
                        , item.getWebMenuName().v()
                        , item.getCompanyId()
                        , item.isDefault())
                        )
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ProgramNameDto> findProgramNames(String companyId) {
    	return standardMenuRepository.findAll(companyId).stream()
    			.map(item -> new ProgramNameDto(companyId, item.getProgramId(), 
    					item.getScreenId(), item.getQueryString(), item.getDisplayName().v()))
    			.collect(Collectors.toList());
    }
}
