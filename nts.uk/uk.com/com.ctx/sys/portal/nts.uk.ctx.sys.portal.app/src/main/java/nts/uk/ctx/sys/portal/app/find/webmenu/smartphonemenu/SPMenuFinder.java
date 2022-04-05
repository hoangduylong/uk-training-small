package nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuEmployment;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuGroup;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuOrder;
import nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu.SPMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * @author sonnh1
 *
 */
@Stateless
public class SPMenuFinder {

	@Inject
	private StandardMenuRepository standardMenuRepository;
	@Inject
	private SPMenuRepository sPMenuRepository;

	final int SYSTEM = System.TIME_SHEET.value;
	final int MENUCLASS = MenuClassification.SmartPhone.value;

	/**
	 * 会社ID ： ログイン会社ID システム ： 勤次郎 メニュー分類 ： スマートフォン
	 * 
	 * アルゴリズム「起動時処理」を実行する
	 * 
	 */
	public Ksp001Dto getListMenu() {
		String companyId = AppContexts.user().companyId();
		// アルゴリズム「指定したメニュー分類のメニューを取得する」を実行する
		List<SPMenuDto> lstSPMenuDto = this.getMenuSpecial(companyId);
		// アルゴリズム「設定済みロールを取得する」を実行する
		List<SPMenuEmpDto> lstSPMenuEmpDto = this.getListMenuRole(companyId);

		// アルゴリズム「メニュー設定表示処理」を実行する- get ở service riêng

		return new Ksp001Dto(lstSPMenuDto, lstSPMenuEmpDto);
	}

	/**
	 * アルゴリズム「指定したメニュー分類のメニューを取得する」を実行する
	 */
	public List<SPMenuDto> getMenuSpecial(String companyId) {
		// ドメインモデル「標準メニュー」を取得する
		List<StandardMenu> lstStandardMenu = this.standardMenuRepository.findBySystemMenuClassification(companyId,
				SYSTEM, MENUCLASS);
		if (lstStandardMenu.size() == 0) {
			// システムエラー
			throw new RuntimeException("SYSTEM ERROR!");
		}
		// sort by displayOrder- Thấy không cần thiết phải sắp xếp do sau đó lại
		// sắp xếp lại theo bảng MENU_SORT
		// lstStandardMenu.sort((s1, s2) -> s1.getDisplayOrder() -
		// s2.getDisplayOrder());
		List<String> listCode = lstStandardMenu.stream().map(x -> x.getCode().v()).collect(Collectors.toList());
		// ドメインモデル「スマホメニューグループ」を取得する
		List<SPMenuGroup> lstSPMenuGroup = this.sPMenuRepository.getDataGroup(companyId, listCode);
		// ドメインモデル「スマホメニュー並び順」を取得し、「標準メニュー」を「スマホメニュー並び順」．並び順昇順に並び替える
		List<SPMenuOrder> lstSPMenuOrder = this.sPMenuRepository.getDataOrder(companyId, listCode);
		// 表示するメニューを整理して返す
		List<SPMenuDto> lstSPMenuDto = new ArrayList<>();
		List<SPMenuDto> results = new ArrayList<>();
		// get list menuCode co subMenuCd
		List<String> lstCdParent = lstSPMenuGroup.stream().map(x -> x.getCode().v()).collect(Collectors.toList());
		// get list subMenuCd
		List<String> lstCdChild = lstSPMenuGroup.stream()
				.map(x -> x.getChildMenuCode().stream().map(t -> t.v()).collect(Collectors.toList()))
				.flatMap(List::stream).collect(Collectors.toList());
		// convert to hashmap : <menuCd, listSubMenuCd>
		Map<String, List<String>> mapMenuCd = lstSPMenuGroup.stream().collect(Collectors.toMap(x -> x.getCode().v(),
				x -> x.getChildMenuCode().stream().map(y -> y.v()).collect(Collectors.toList())));
		// set name, displayOrder for list results
		listCode.stream().forEach(menuCode -> {
			Optional<StandardMenu> optStandardMenu = lstStandardMenu.stream()
					.filter(x -> x.getCode().v().equals(menuCode)).findFirst();
			String displayName = null;
			String targetItems = null;
			if(optStandardMenu.isPresent()){
				displayName = optStandardMenu.get().getDisplayName().v();
				targetItems = optStandardMenu.get().getTargetItems();
			}
			Optional<SPMenuOrder> optSPMenuOrder = lstSPMenuOrder.stream().filter(x -> x.getCode().v().equals(menuCode))
					.findFirst();
			int displayOrder = optSPMenuOrder.isPresent() ? optSPMenuOrder.get().getSortOrder() : 0;

			lstSPMenuDto.add(new SPMenuDto(menuCode, displayName, targetItems, displayOrder, false, new ArrayList<>()));
		});
		// group results
		lstSPMenuDto.forEach(sPMenuDto -> {
			// neu menuCd la subMenu
			String menuCd = sPMenuDto.getMenuCd();
			if (lstCdParent.contains(menuCd)) {
				// get list subMenu
				List<String> lstSubCd = mapMenuCd.get(menuCd);
				lstSubCd.forEach(y -> {
					// add subMenu to lstChild of parent
					SPMenuDto subMenu = lstSPMenuDto.stream().filter(z -> z.getMenuCd().equals(y)).findFirst().get();
					// set isChild is true
					subMenu.setChild(true);
					sPMenuDto.getLstChild().add(subMenu);
				});
			}
		});
		// remove subMenu in lstSPMenuDto
		lstCdChild.forEach(x -> {
			lstSPMenuDto.remove(lstSPMenuDto.stream().filter(y -> y.getMenuCd().equals(x)).findFirst().get());
		});
		// sort parent menuCd
		lstSPMenuDto.sort((SPMenuDto s1, SPMenuDto s2) -> s1.getDisplayOrder() - s2.getDisplayOrder());
		// sort sub menuCd
		lstSPMenuDto.forEach(spMenu -> {
			if (spMenu.getLstChild().size() > 1) {
				spMenu.getLstChild().sort((SPMenuDto s1, SPMenuDto s2) -> s1.getDisplayOrder() - s2.getDisplayOrder());
			}
		});
		// flat list
		lstSPMenuDto.forEach(x -> {
			if (x.getLstChild().size() == 0) {
				results.add(x);
			} else {
				results.add(x);
				results.addAll(x.getLstChild());
			}
		});

		return results;
	}

	/**
	 * アルゴリズム「設定済みロールを取得する」を実行する
	 */
	public List<SPMenuEmpDto> getListMenuRole(String companyId) {
		// ドメインモデル「スマホメニュー（就業）」を取得する
		List<SPMenuEmpDto> results = this.sPMenuRepository.getDataEmp(companyId).stream()
				.map(x -> new SPMenuEmpDto(x.getCompanyId(), x.getEmploymentRole(), x.getMenuCode().v(),
						x.getDisplayAtr().value))
				.collect(Collectors.toList());
		// group by theo ROLEID TODO
		return results;
	}

	/**
	 * アルゴリズム「メニュー設定表示処理」を実行する
	 */
	public List<SPMenuEmpDto> getMenuSetDisplay(String empRoleId, List<String> lstMenuCd) {
		String companyId = AppContexts.user().companyId();
		// ドメインモデル「スマホメニュー（就業）」を取得する
		List<SPMenuEmployment> lstSPMenuEmployment = this.sPMenuRepository.getDataEmp(companyId, empRoleId, lstMenuCd);
		return lstSPMenuEmployment.stream().map(x -> new SPMenuEmpDto(x.getCompanyId(), x.getEmploymentRole(),
				x.getMenuCode().v(), x.getDisplayAtr().value)).collect(Collectors.toList());
	}
}
