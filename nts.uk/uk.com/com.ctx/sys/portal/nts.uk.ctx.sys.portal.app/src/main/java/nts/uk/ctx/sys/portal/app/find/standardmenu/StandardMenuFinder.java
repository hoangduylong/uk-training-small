package nts.uk.ctx.sys.portal.app.find.standardmenu;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class StandardMenuFinder.
 */
@Stateless
public class StandardMenuFinder {

	@Inject
	private StandardMenuRepository standardMenuRepository;

	/**
	 * find all StandardMenu by companyID
	 * 
	 * @param conpanyID
	 * @return List
	 */
	public List<StandardMenuDto> findAll() {
		String companyID = AppContexts.user().companyId();
		return this.standardMenuRepository.findAllDisplay(companyID).stream().map(item -> StandardMenuDto.fromDomain(item))
				.collect(Collectors.toList());
	}

	/**
	 * find all StandardMenu by companyID and AfterLoginDisplayIndicator
	 * 
	 * 
	 * @param conpanyID
	 * @return List
	 */
	public List<StandardMenuDto> findByAfterLoginDisplay(int afterLoginDisplay) {
		String companyID = AppContexts.user().companyId();
		return this.standardMenuRepository.findByAfterLoginDisplay(companyID, afterLoginDisplay).stream()
				.map(item -> StandardMenuDto.fromDomain(item)).collect(Collectors.toList());
	}

	/**
	 * find by companyId, system = common, menuClassification = top page
	 * 
	 * @return List StandardMenuDto
	 */
	public List<StandardMenuDto> findBySystemMenuCls() {
		String companyId = AppContexts.user().companyId();
		return this.standardMenuRepository
				.findBySystemMenuClassification(companyId, System.COMMON.value, MenuClassification.TopPage.value)
				.stream().map(x -> StandardMenuDto.fromDomain(x)).collect(Collectors.toList());
	}

	/**
	 * find by companyId, menuClassification = top page or afterLoginDis =
	 * display
	 * 
	 * note : menuClassification = top page (8) mean system = common (0)
	 * 
	 * @return
	 */
	public List<StandardMenuDto> findDataForAfterLoginDis() {
		String companyId = AppContexts.user().companyId();
		return this.standardMenuRepository.findDataForAfterLoginDis(companyId, 1, MenuClassification.TopPage.value)
				.stream().map(x -> StandardMenuDto.fromDomain(x)).collect(Collectors.toList());
	}

	/**
	 * find all StandardMenu by companyID and webMenuSetting = 0 and menuAtr = 0
	 * 
	 * @param conpanyID
	 * @param webMenuSetting
	 * @param menuAtr
	 * @return List
	 */
	public List<StandardMenuDto> findByAtr(int webMenuSetting, int menuAtr) {
		String companyID = AppContexts.user().companyId();
		return this.standardMenuRepository.findByAtr(companyID, webMenuSetting, menuAtr).stream()
				.map(item -> StandardMenuDto.fromDomain(item)).collect(Collectors.toList());

	}

	/**
	 * find all StandardMenu by companyID and system
	 * 
	 * @param conpanyID
	 * @return List
	 */
	public List<StandardMenuDto> findAllDisplay() {
		String companyID = AppContexts.user().companyId();
		return this.standardMenuRepository.findAllDisplay(companyID).stream()
				.map(item -> StandardMenuDto.fromDomain(item)).collect(Collectors.toList());
	}
	
	public String getProgramName(String programId, String screenId) {
		String companyId = AppContexts.user().companyId();
		List<StandardMenu> standardMenuLst = standardMenuRepository.getProgram(companyId, programId, screenId);
		if(CollectionUtil.isEmpty(standardMenuLst)){
			return null;
		}
		return programId + screenId + " " + standardMenuLst.get(0).getDisplayName().v();
	}
	//get pg-name by programId, screenId, queryString
	public String getPgNameByQry(String programId, String screenId, String queryString) {
		String companyId = AppContexts.user().companyId();
		Optional<StandardMenu> optStandardMenu = Optional.empty();
		if (queryString != null) {
			optStandardMenu = this.standardMenuRepository
					.getMenuDisplayNameHasQuery(companyId, programId, queryString, screenId);
		} else {
			optStandardMenu = this.standardMenuRepository
					.getMenuDisplayNameNoQuery(companyId, programId, screenId);
		}
		return optStandardMenu
				.map(standardMenu -> programId + screenId + " " + standardMenu.getDisplayName().v())
				.orElse(null);
	}
}
