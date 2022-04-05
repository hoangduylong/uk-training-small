/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.app.find.roleset;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.roleset.RoleSet;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSetRepository;
import nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking.RoleSetLinkWebMenuAdapter;
import nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking.RoleSetLinkWebMenuImport;
import nts.uk.shr.com.context.AppContexts;

/**
* The Class RoleSetFinder.
* @author HieuNV
*/
@Stateless
public class RoleSetFinder {

    @Inject
    private RoleSetRepository roleSetRepository;

    @Inject
    private RoleSetLinkWebMenuAdapter roleSetLinkWebMenuAdapter;
    
    /**
     * Get a RoleSet
     * @param roleSetCd
     * @return
     */
    public RoleSetDto find(String roleSetCd) {

        // get domain role set
        Optional<RoleSet> roleSetOpt = roleSetRepository.findByRoleSetCdAndCompanyId(roleSetCd, AppContexts.user().companyId());
        if (roleSetOpt.isPresent()) {
            RoleSet roleSet = roleSetOpt.get();
            return RoleSetDto.build(roleSet, buildWebMenuDto(roleSet.getRoleSetCd().v()));
        }

        return null;
    }

    /**
     * Get all Role set by company id
     * 	 ドメインモデル「ロールセット」を取得する
     * @return
     */
    public List<RoleSetDto> findAll() {
    	List<RoleSet> lstRoleSet = this.roleSetRepository.findByCompanyId(AppContexts.user().companyId());
    	List<String> listRoleSetCD = lstRoleSet.stream()
    			.map(item -> item.getRoleSetCd().v())
    			.collect(Collectors.toList());
    	Map<String, List<RoleSetLinkWebMenuImport>> mapRoleSetLinkWebMenu = roleSetLinkWebMenuAdapter.findAllWebMenuByListRoleSetCd(listRoleSetCD).stream()
    			.collect(Collectors.groupingBy(RoleSetLinkWebMenuImport::getRoleSetCd));
    	return lstRoleSet.stream()
    			.map(item -> {
    				List<RoleSetLinkWebMenuImport> listImport = mapRoleSetLinkWebMenu.get(item.getRoleSetCd().v());
    				if (listImport == null) { 
    					return RoleSetDto.build(item, Collections.emptyList());
    				}
    				return RoleSetDto.build(item, listImport.stream()
    						.map(imported -> new WebMenuImportDto(imported.getWebMenuCd(), ""))
    						.collect(Collectors.toList()));
    			})
    			.sorted(Comparator.comparing(RoleSetDto::getRoleSetCd))
    			.collect(Collectors.toList());
    }

    /**
     * Build list of WebMenuDTO from RoleSetCd
     * @param roleSetCd
     * @return list of web menu dto.
     */
    private List<WebMenuImportDto> buildWebMenuDto(String roleSetCd) {

        return roleSetLinkWebMenuAdapter.findAllWebMenuByRoleSetCd(roleSetCd)
                .stream().map(item-> new WebMenuImportDto(item.getWebMenuCd(), "")).collect(Collectors.toList());
    }
}
