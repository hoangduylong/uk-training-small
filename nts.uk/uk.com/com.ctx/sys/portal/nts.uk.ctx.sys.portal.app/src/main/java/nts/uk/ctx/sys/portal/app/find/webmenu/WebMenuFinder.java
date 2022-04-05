package nts.uk.ctx.sys.portal.app.find.webmenu;

import static java.util.stream.Collectors.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.apache.logging.log4j.util.Strings;

import nts.arc.enums.EnumAdaptor;
import nts.arc.enums.EnumConstant;
import nts.arc.i18n.I18NResources;
import nts.arc.scoped.request.RequestContextProvider;
import nts.gul.collection.CollectionUtil;
import nts.gul.util.OptionalUtil;
import nts.uk.ctx.sys.portal.app.find.roleset.RoleSetPortalFinder;
import nts.uk.ctx.sys.portal.app.find.standardmenu.StandardMenuDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.detail.MenuBarDetailDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.detail.TitleBarDetailDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.detail.TreeMenuDetailDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.detail.WebMenuDetailDto;
import nts.uk.ctx.sys.portal.dom.adapter.role.RoleGrantAdapter;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.standardmenu.MenuCode;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuKey;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.MenuBar;
import nts.uk.ctx.sys.portal.dom.webmenu.SelectedAtr;
import nts.uk.ctx.sys.portal.dom.webmenu.TitleBar;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.personaltying.PersonalTying;
import nts.uk.ctx.sys.portal.dom.webmenu.personaltying.PersonalTyingRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuEmployment;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuGroup;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuOrder;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleByRoleTiesRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenuRepository;
import nts.uk.ctx.sys.shared.dom.user.builtin.BuiltInUser;
import nts.uk.shr.com.constants.DefaultSettingKeys;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.AppContextsConfig;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.program.Program;
import nts.uk.shr.com.program.ProgramsManager;
import nts.uk.shr.com.program.WebAppId;

@Stateless
public class WebMenuFinder {

	@Inject
	private WebMenuRepository webMenuRepository;
	
	@Inject
	private StandardMenuRepository standardMenuRepository;
	
	@Inject
	private I18NResources internationalization;
	
	@Inject
	private PersonalTyingRepository personalTyingRepository;
	
	@Inject
	private RoleByRoleTiesRepository roleTiesRepository;
	
	@Inject
	private RoleSetLinkWebMenuRepository roleSetLinkMenuRepo;
	
	@Inject
	private RoleGrantAdapter roleAdapter;
	
	@Inject
	private RoleSetPortalFinder roleSetFinder;
	
	@Inject
	private SPMenuRepository sPMenuRepository;

	/**
	 * Find a web menu by code
	 * @param webMenuCode
	 * @return
	 */
	public WebMenuDto find(String webMenuCode) {
		String companyId = AppContexts.user().companyId();
		Optional<WebMenu> webMenuOpt = webMenuRepository.find(companyId, webMenuCode);
		if (!webMenuOpt.isPresent()) {
			return null;
		}
		
		return webMenuOpt.map(webMenuItem -> {
			List<MenuBarDto> menuBars = toMenuBar(webMenuItem);
			
			return new WebMenuDto(
					companyId, 
					webMenuItem.getWebMenuCode().v(), 
					webMenuItem.getWebMenuName().v(), 
					webMenuItem.getDefaultMenu().value,
					menuBars);
		}).get();
	}
	
	/**
	 * Find menu list.
	 * @param codes codes
	 * @return menu list
	 */
	public List<WebMenuDetailDto> find(List<MenuCodeDto> codes) {
		List<WebMenuDetailDto> results = new ArrayList<>();
		Map<String, List<MenuCodeDto>> companyMap = codes.stream().collect(Collectors.groupingBy(c -> c.getCompanyId()));
		companyMap.forEach((companyId, codeDtos) -> {
			List<String> menuCodes = codeDtos.stream().map(MenuCodeDto::getMenuCode).collect(Collectors.toList());
			List<WebMenu> webMenus = webMenuRepository.find(companyId, menuCodes);
			List<WebMenuDetailDto> menuDtos = webMenus.stream().map(m -> toMenuDetails(m, companyId))
															.collect(Collectors.toList());
			results.addAll(menuDtos);
		});
		
		results.sort((m1, m2) -> {
			int compared = m1.getCompanyId().compareTo(m2.getCompanyId());
			if (compared == 0) {
				return m1.getWebMenuCode().compareTo(m2.getWebMenuCode());
			}
			
			return compared;
		});
		
		return results;
	}
	
	/**
	 * Find all item web menu
	 * @return
	 */
	public List<WebMenuDto> findAll() {
		String companyId = AppContexts.user().companyId();

		List<WebMenu> webMenuList = webMenuRepository.findAll(companyId);

		List<WebMenuDto> result = webMenuList.stream().map(webMenuItem -> {
			List<MenuBarDto> menuBars = toMenuBar(webMenuItem);
			
			return new WebMenuDto(
					companyId, 
					webMenuItem.getWebMenuCode().v(), 
					webMenuItem.getWebMenuName().v(), 
					webMenuItem.getDefaultMenu().value,
					menuBars);
		}).collect(Collectors.toList());

		return result;
	}
	
	/**
	 * RequestList No.95「すべてのWebメニューを取得する」
	 * Get all simple web menu info
	 * @return
	 */
	public List<WebMenuSimpleDto> findAllWithNoMenuBar() {
		String companyId = AppContexts.user().companyId();
		return webMenuRepository.findAllSimpleValue(companyId).stream().map(webMenuItem -> {
			return new WebMenuSimpleDto(webMenuItem.getCode(), webMenuItem.getName());
		}).collect(Collectors.toList());
	}
	
	/**
	 * Find all menu details.
	 * @return menu details
	 */
	public List<WebMenuDetailDto> findAllDetails() {
		LoginUserContext userCtx = AppContexts.user();
		String companyId = userCtx.companyId();
		List<MenuCodeDto> menus = getMenuSet(companyId, userCtx.userId());
		return menus != null && !menus.isEmpty() ? find(menus) : Arrays.asList(findDefault());
	}
	
	/**
	 * Get menu set.
	 * @param companyId companyId
	 * @param userId userId
	 * @return list of menu codes
	 */
	private List<MenuCodeDto> getMenuSet(String companyId, String userId) {
		if (companyId == null || userId == null) return null;

		List<MenuCodeDto> menuCodes = new ArrayList<>();
		
		// Get role ties
		List<String> roleIds;
		if (BuiltInUser.USER_ID.equals(userId)) {
			roleIds = BuiltInUser.allRoleIds();
		} else {
			roleIds = roleAdapter.getRoleId(userId);
		}
		
		roleIds.stream()
				.map(r -> roleTiesRepository.getByRoleIdAndCompanyId(r, companyId))
				.flatMap(OptionalUtil::stream)
				.map(t -> new MenuCodeDto(t.getCompanyId(), t.getWebMenuCd().v()))
				.forEach(m -> menuCodes.add(m));
		
		// Get role set
		if (!BuiltInUser.USER_ID.equals(userId)) {
			
			roleSetFinder.getRoleSetCode(companyId, userId).ifPresent(roleSetCode -> {
				
				roleSetLinkMenuRepo.findByRoleSetCd(companyId, roleSetCode).stream()
						.map(m -> new MenuCodeDto(m.getCompanyId(), m.getWebMenuCd().v()))
						.forEach(m -> menuCodes.add(m));
			});
		}
		
		// 重複排除
		return menuCodes.stream().distinct().collect(toList());
	}
	
	/**
	 * Find default menu.
	 * @return default menu
	 */
	public WebMenuDetailDto findDefault() {
		String companyId = AppContexts.user().companyId();
		Optional<WebMenu> menuOpt = webMenuRepository.findDefault(companyId);
		if (!menuOpt.isPresent()) return null;
		WebMenu menu = menuOpt.get();
		return toMenuDetails(menu, companyId);
	}
	
	/**
	 * To menu details.
	 * @param menu menu
	 * @param companyId company Id
	 * @return web menu details
	 */
	private WebMenuDetailDto toMenuDetails(WebMenu menu, String companyId) {
		List<StandardMenuKey> keys = new ArrayList<>();
		menu.getMenuBars().stream().forEach(m -> {
			keys.add(new StandardMenuKey(companyId, m.getCode().v(), m.getSystem().value, m.getMenuCls().value));
			m.getTitleMenu().stream().forEach(t -> {
				t.getTreeMenu().stream().forEach(tm -> {
					keys.add(new StandardMenuKey(companyId, tm.getCode().v(), tm.getSystem().value, tm.getClassification().value));
				});
			});
		});
		
		List<StandardMenu> standardMenus = standardMenuRepository.find(keys);
		List<MenuBarDetailDto> menuBar = menu.getMenuBars().stream().map(m -> {
			String link = null;
			if (m.getSelectedAtr() == SelectedAtr.DirectActivation) {
				StandardMenu sMenu = standardMenus.stream()
						.filter(sm -> sm.getCompanyId().equals(companyId) 
								&& sm.getCode().v().equals(m.getCode().v())
								&& sm.getSystem() == m.getSystem()
								&& sm.getClassification() == m.getMenuCls()).findFirst()
						.orElseThrow(() -> new RuntimeException("Menu not found."));
				link = getProgramPath(sMenu);
				
				if (sMenu.getQueryString() != null) {
					link += "?" + sMenu.getQueryString();
				}
			}
			
			List<TitleBarDetailDto> titleBars = m.getTitleMenu().stream().map(t -> {
				List<TreeMenuDetailDto> treeMenus = t.getTreeMenu().stream().map(tm -> {
					String menuCode = tm.getCode().v();
					int system = tm.getSystem().value;
					int classification = tm.getClassification().value;
					StandardMenu stdMenu = standardMenus.stream()
							.filter(sm -> sm.getCompanyId().equals(companyId)
									&& sm.getCode().v().equals(menuCode)
									&& sm.getSystem() == tm.getSystem()
									&& sm.getClassification() == tm.getClassification()).findFirst()
							.orElseThrow(() -> new RuntimeException("Menu not found."));
					String path = getProgramPath(stdMenu);
					return new TreeMenuDetailDto(menuCode, stdMenu.getTargetItems(), stdMenu.getDisplayName().v(),
							path, tm.getDisplayOrder(), system, stdMenu.getMenuAtr().value, classification, 
							stdMenu.getAfterLoginDisplay(), stdMenu.getProgramId(), stdMenu.getScreenId(), stdMenu.getQueryString());
				}).sorted((tm1, tm2) -> tm1.getDisplayOrder() - tm2.getDisplayOrder()).collect(Collectors.toList());
				
				return new TitleBarDetailDto(t.getTitleMenuId().toString(), 
						t.getTitleMenuName().v(), t.getBackgroundColor().v(), t.getImageFile(),
						t.getTextColor().v(), t.getTitleMenuAtr().value, t.getTitleMenuCode().v(),
						t.getDisplayOrder(), treeMenus);
			}).sorted((t1, t2) -> t1.getDisplayOrder() - t2.getDisplayOrder()).collect(Collectors.toList());
			
			return new MenuBarDetailDto(m.getMenuBarId().toString(),
					m.getCode().v(), m.getMenuBarName().v(), m.getSelectedAtr().value, link,
					m.getSystem().value, m.getMenuCls().value, m.getDisplayOrder().intValue(), titleBars);
		}).sorted((m1, m2) -> m1.getDisplayOrder() - m2.getDisplayOrder()).collect(Collectors.toList());
		return new WebMenuDetailDto(companyId, menu.getWebMenuCode().v(),
				menu.getWebMenuName().v(), menu.getDefaultMenu().value, menuBar);
	}
	
	/**
	 * Find program path.
	 * @param companyId companyId
	 * @param menuCode menuCode
	 * @param system system
	 * @param classification classification
	 * @return program path
	 */
	private String getProgramPath(StandardMenu stdMenu) {
		// Get system
		System sys = stdMenu.getSystem();
		WebAppId appId = null;
		if (sys == System.COMMON) {
			appId = WebAppId.COM;
		} else if (sys == System.TIME_SHEET) {
			appId = WebAppId.AT;
		} else if (sys == System.KYUYOU) {
			appId = WebAppId.PR;
		}
		
		String url = stdMenu.getUrl();
		if (url == null || "".equals(url)) {
			Optional<Program> programOpt = ProgramsManager.findById(appId, 
					stdMenu.getProgramId() + (stdMenu.getScreenId() == null ? "" : stdMenu.getScreenId()));
			if (programOpt.isPresent()) {
				url = programOpt.get().getPPath();
			}
		}
		return url;
	}
	
	/**
	 * Get program string.
	 * @return program string
	 */
	public List<ProgramNameDto> getProgram() {
		String pgId = RequestContextProvider.get().get(AppContextsConfig.KEY_PROGRAM_ID);
		if (pgId == null) return new ArrayList<>();
		
		String programId = pgId, screenId = null;
		if (pgId.length() > 6) {
			 programId = pgId.substring(0, 6);
			 screenId = pgId.substring(6);
		}
		
		String companyId = AppContexts.user().companyId();
		
		// ビルトインユーザならゼロ会社のメニューを参照
		if (BuiltInUser.USER_ID.equals(AppContexts.user().userId())) {
			companyId = DefaultSettingKeys.COMPANY_ID;
		}
		
		return standardMenuRepository.getProgram(companyId, programId, screenId).stream()
				.map(m -> new ProgramNameDto(m.getQueryString(), pgId + " " + m.getDisplayName()))
				.collect(Collectors.toList());
	}
	
	
	/**
	 * 
	 * @return
	 */
	public EditMenuBarDto getEditMenuBarDto() {
		List<EnumConstant> listSelectedAtr = EnumAdaptor.convertToValueNameList(SelectedAtr.class, internationalization);
		List<EnumConstant> listSystem = EnumAdaptor.convertToValueNameList(nts.uk.ctx.sys.portal.dom.enums.System.class, internationalization);
		List<EnumConstant> listMenuClassification = EnumAdaptor.convertToValueNameList(MenuClassification.class);
		String companyID = AppContexts.user().companyId();
		int webMenuSetting = 1;
		int menuAtr = 0;
		//List<StandardMenuDto> listStandardMenu = standardMenuRepository.findByAtr(companyID, WebMenuSetting.Display.value, MenuAtr.Menu.value)
		List<StandardMenuDto> listStandardMenu = standardMenuRepository.findByAtr(companyID, webMenuSetting, menuAtr)
				.stream().map(item -> StandardMenuDto.fromDomain(item))
				.collect(Collectors.toList());
		return new EditMenuBarDto(listSelectedAtr, listSystem, listMenuClassification, listStandardMenu);
	}

	/**
	 * convert to  MenuBar
	 * 
	 * @param domain
	 * @return
	 */
	private static List<MenuBarDto> toMenuBar(WebMenu domain) {
		List<MenuBarDto> menuBars = domain.getMenuBars().stream().map(mn -> {
			List<TitleBarDto> titleMenus = toTitleMenu(domain, mn);

			return new MenuBarDto(mn.getMenuBarId().toString(), mn.getCode().v(), mn.getMenuBarName().v(),
					mn.getSelectedAtr().value, mn.getSystem().value, mn.getMenuCls().value, mn.getDisplayOrder(), titleMenus);
		}).collect(Collectors.toList());
		return menuBars;
	}

	/**
	 * convert to  TitleMenu
	 * 
	 * @param domain
	 * @param mn
	 * @return
	 */
	private static List<TitleBarDto> toTitleMenu(WebMenu domain, MenuBar mn) {
		List<TitleBarDto> titleMenus = mn.getTitleMenu().stream().map(tm -> {
			List<TreeMenuDto> treeMenus = toTreeMenu(domain, tm);

			return new TitleBarDto(tm.getTitleMenuId().toString(), tm.getTitleMenuName().v(), tm.getBackgroundColor().v(),
					tm.getImageFile(), tm.getTextColor().v(), tm.getTitleMenuAtr().value, tm.getTitleMenuCode().v(),
					tm.getDisplayOrder(), treeMenus);
		}).collect(Collectors.toList());
		
		return titleMenus;
	}

	/**
	 * convert to  TreeMenu
	 * 
	 * @param domain
	 * @param tm
	 * @return
	 */
	private static List<TreeMenuDto> toTreeMenu(WebMenu domain, TitleBar tm) {
		List<TreeMenuDto> treeMenus = tm.getTreeMenu().stream().map(trm -> {
			return new TreeMenuDto(trm.getCode().v(), trm.getDisplayOrder(), trm.getClassification().value,
					trm.getSystem().value);
		}).collect(Collectors.toList());
		return treeMenus;
	}
	
	/**
	 * Find all Person
	 * @param employeeId
	 * @return
	 */
	public List<PersonTypeDto> findAllPerson(String employeeId) {
		String companyId = AppContexts.user().companyId();
		return personalTyingRepository.findAll(companyId, employeeId).stream().map(e -> {
			return convertToDbType(e);
		}).collect(Collectors.toList()); 
	}

	/**
	 * Convert to Database
	 * @param personalTying
	 * @return
	 */
	private PersonTypeDto convertToDbType(PersonalTying personalTying) {
		PersonTypeDto personTypeDto = new PersonTypeDto();
		personTypeDto.setWebMenuCode(personalTying.getWebMenuCode());
		personTypeDto.setEmployeeId(personalTying.getEmployeeId());
		
		return personTypeDto;
	}
	
	public List<MobileMenuDto> getMenuToDisplay(){
		List<MobileMenuDto> mobileMenuDtoLst = new ArrayList<>();
		String companyID = AppContexts.user().companyId();
		String roleID = AppContexts.user().roles().forAttendance();
		// ドメインモデル「スマホメニュー（就業）」を取得する
		List<SPMenuEmployment> sPMenuEmploymentLst = sPMenuRepository.findSPMenuEmploymentUse(companyID, roleID);
		if(CollectionUtil.isEmpty(sPMenuEmploymentLst)){
			return mobileMenuDtoLst;
		}
		// ドメインモデル「スマホメニュー並び順」を取得する
		List<SPMenuOrder> sPMenuOrderASCLst = sPMenuRepository.findSPMenuOrderASC(companyID);
		// 取得した「スマホメニュー（就業）」を「スマホメニュー並び順」．並び順昇順で並び替える
		List<MenuCode> menuCDLst = sPMenuEmploymentLst.stream().map(x -> x.getMenuCode()).collect(Collectors.toList());
		// ドメインモデル「スマホメニューグループ」を取得する
		List<SPMenuGroup> sPMenuGroupLst = sPMenuRepository.findSPMenuGroupSubList(companyID, menuCDLst);
		List<String> removeLst = new ArrayList<>();
		// ドメインモデル「標準メニュー」を取得する
		List<String> totalMenuCDLst = menuCDLst.stream().map(x -> x.v()).collect(Collectors.toList());
		for(SPMenuGroup sPMenuGroup : sPMenuGroupLst){
			removeLst.addAll(sPMenuGroup.getChildMenuCode().stream().map(x -> x.v()).collect(Collectors.toList()));
			removeLst.add(sPMenuGroup.getCode().v());
			if(!totalMenuCDLst.contains(sPMenuGroup.getCode().v())){
				totalMenuCDLst.add(sPMenuGroup.getCode().v());
			}
		}
		List<StandardMenu> standardMenuLst = standardMenuRepository.findByCIDMobileCode(companyID, totalMenuCDLst);
		List<String> noChildLst = totalMenuCDLst;
		noChildLst.removeAll(removeLst);
		// 表示するメニューを整理して返す
		for(String code : noChildLst){
			Optional<StandardMenu> opStandardMenu = standardMenuLst.stream().filter(y -> y.getCode().equals(code)).findAny();
			if(!opStandardMenu.isPresent()){
				continue;
			}
			StandardMenu standardMenu = opStandardMenu.get();
			List<MobileMenuChildDto> mobileMenuChildDtoLst = new ArrayList<>();
			String url = "/" + standardMenu.getProgramId().substring(0, 3) + 
					"/" + standardMenu.getProgramId().substring(3) + "/" + standardMenu.getScreenId();
			if(Strings.isNotBlank(standardMenu.getQueryString())) {
				url = url + "?" + standardMenu.getQueryString();
			}
			mobileMenuDtoLst.add(new MobileMenuDto(
					code, 
					standardMenu.getDisplayName().v(), 
					this.getSPMenuOrder(sPMenuOrderASCLst, code), 
					url.toLowerCase(), 
					mobileMenuChildDtoLst));
		}
		for(SPMenuGroup sPMenuGroup : sPMenuGroupLst){
			Optional<StandardMenu> opStandardMenu = standardMenuLst.stream().filter(y -> y.getCode().equals(sPMenuGroup.getCode())).findAny();
			if(!opStandardMenu.isPresent()){
				continue;
			}
			StandardMenu standardMenu = opStandardMenu.get();
			List<MobileMenuChildDto> mobileMenuChildDtoLst = new ArrayList<>();
			for(MenuCode childMenu : sPMenuGroup.getChildMenuCode()){
				Optional<StandardMenu> opStandardMenuChild = standardMenuLst.stream().filter(y -> y.getCode().equals(childMenu.v())).findAny();
				if(!opStandardMenuChild.isPresent()){
					continue;
				}
				StandardMenu standardMenuChild = opStandardMenuChild.get();
				String childUrl = "/" + standardMenuChild.getProgramId().substring(0, 3) + 
						"/" + standardMenuChild.getProgramId().substring(3) + "/" + standardMenuChild.getScreenId();
				if(Strings.isNotBlank(standardMenuChild.getQueryString())) {
					childUrl = childUrl + "?" + standardMenuChild.getQueryString();
				}
				mobileMenuChildDtoLst.add(new MobileMenuChildDto(
						childMenu.v(), 
						standardMenuChild.getDisplayName().v(), 
						childUrl.toLowerCase()));
			}
			mobileMenuDtoLst.add(new MobileMenuDto(
					sPMenuGroup.getCode().v(), 
					standardMenu.getDisplayName().v(), 
					this.getSPMenuOrder(sPMenuOrderASCLst, sPMenuGroup.getCode().v()), 
					"", 
					mobileMenuChildDtoLst));
		}
		return mobileMenuDtoLst.stream().sorted(Comparator.comparing(MobileMenuDto::getDisplayOrder)).collect(Collectors.toList());
	}
	
	private int getSPMenuOrder(List<SPMenuOrder> sPMenuOrderASCLst, String code){
		return sPMenuOrderASCLst.stream().filter(x -> x.getCode().toString().equals(code)).findAny().map(x -> x.getSortOrder()).orElse(1000);
	}
}
