package nts.uk.ctx.sys.portal.app.find.webmenu.webmenulinking;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenuRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class RoleSetLinkWebMenuFinder {

	@Inject
	private RoleSetLinkWebMenuRepository roleSetAndWebMenuRepository;

	/**
	 * Find a RoleSetAndWebMenu by webMenuCd and roleSetCd
	 * @param webMenuCode
	 * @return
	 */
	public RoleSetLinkWebMenuDto find(String webMenuCd, String roleSetCd) {
		String companyId = AppContexts.user().companyId();
		Optional<RoleSetLinkWebMenu> webMenuOpt = roleSetAndWebMenuRepository.findByKey(companyId, roleSetCd, webMenuCd);
		if (!webMenuOpt.isPresent()) {
			return null;
		}
		
		return RoleSetLinkWebMenuDto.build(webMenuOpt.get());
	}
	
	/**
	 * Find all RoleSetAndWebMenu by company id and role set cd
	 * @param roleSetCd
	 * @return
	 */
	public List<RoleSetLinkWebMenuDto> findAllByRoleSet(String roleSetCd) {

		String companyId = AppContexts.user().companyId();
		return roleSetAndWebMenuRepository.findByRoleSetCd(companyId, roleSetCd).stream().map(item -> {
			return RoleSetLinkWebMenuDto.build(item);
		}).collect(Collectors.toList());
	}

	/**
	 * Find all RoleSetAndWebMenu by company id
	 * @return
	 */
	public List<RoleSetLinkWebMenuDto> findAll() {

		String companyId = AppContexts.user().companyId();
		return roleSetAndWebMenuRepository.findByCompanyId(companyId).stream().map(item -> {
			return RoleSetLinkWebMenuDto.build(item);
		}).collect(Collectors.toList());
	}

}
