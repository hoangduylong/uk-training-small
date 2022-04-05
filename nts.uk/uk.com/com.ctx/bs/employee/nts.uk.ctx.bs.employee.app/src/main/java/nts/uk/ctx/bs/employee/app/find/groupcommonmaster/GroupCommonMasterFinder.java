package nts.uk.ctx.bs.employee.app.find.groupcommonmaster;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employee.employeelicense.ContractCode;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterCode;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterName;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMaster;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterDomainService;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterItem;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class GroupCommonMasterFinder {

	/**
	 * 起動する
	 * 
	 * @return 共通マスタリスト(List)
	 */
	@Inject
	private GroupCommonMasterDomainService services;

	public List<GroupCommonMasterDto> getMaster() {

		// アルゴリズム [グループ会社共通マスタの取得] を実行する(Thực hiện thuật toán [Get group company
		// common master])
		String contractCode = AppContexts.user().contractCode();

		// 選択共通マスタオブジェクトを生成する(Tạo selection common master object)
		List<GroupCommonMasterDto> groupMasterDtos = services.getGroupCommonMaster(contractCode).stream()
				.map(x -> new GroupCommonMasterDto(x)).collect(Collectors.toList());

		if (CollectionUtil.isEmpty(groupMasterDtos)) {
			return groupMasterDtos;
		}

		return groupMasterDtos.stream().sorted(Comparator.comparing(GroupCommonMasterDto::getCommonMasterCode))
				.collect(Collectors.toList());

	}

	/**
	 * 共通マスタの選択処理
	 * 
	 * @param 共通マスタID
	 * @return 共通マスタリスト (List)
	 */
	public List<GroupCommonItemDto> getItems(String commonMasterId) {

		String contractCode = AppContexts.user().contractCode();
		// アルゴリズム [グループ会社共通マスタ項目の取得] を実行する (Thực hiện thuật
		// toán"getGroupCommonMasterItem" )

		List<GroupCommonItemDto> groupItems = services.getGroupCommonMasterItem(contractCode, commonMasterId).stream()
				.map(x -> new GroupCommonItemDto(x)).sorted(Comparator.comparing(GroupCommonItemDto::getDisplayNumber))
				.collect(Collectors.toList());

		if (CollectionUtil.isEmpty(groupItems)) {
			throw new BusinessException("Msg_1578");
		}

		String companyId = AppContexts.user().companyId();
		// アルゴリズム [グループ会社共通マスタ項目の使用設定の取得] を実行する (Thực hiện thuật toán
		// "getGroupCommonMasterUsage")
		List<String> companyUsages = services.getGroupCommonMasterUsage(contractCode, commonMasterId, companyId);
		// 使用設定オブジェクトを更新する (Cập nhật Use settings object)
		groupItems.forEach(item -> {
			companyUsages.stream().filter(u -> u.equals(item.getCommonMasterItemId())).findFirst().ifPresent(u -> {
				item.setUseSetting(1);
			});
		});

		return groupItems.stream().sorted(Comparator.comparing(GroupCommonItemDto::getDisplayNumber)).collect(Collectors.toList());
	}
	
	/**
	 * 画面Bの起動処理
	 * @param contractCd
	 * @param commonMasterId
	 * @return
	 * @author yennth
	 */
	public ScreenBSelectCommonMasterDto getScreenBStart(String commonMasterId){
		String contractCd = AppContexts.user().contractCode();
		// グループ会社共通マスタ項目の取得
		List<GroupCommonMasterItem> getCommonMasterItem = services.getGroupCommonMasterItem(contractCd, commonMasterId);
		if(!getCommonMasterItem.isEmpty()) {
			ScreenBSelectCommonMasterDto screenBCommon = new ScreenBSelectCommonMasterDto(commonMasterId, getCommonMasterItem.stream()
																												.map(x -> new CommonMasterItemDto(x.getCommonMasterItemId(), 
																																				x.getCommonMasterItemCode().v(),
																																				x.getCommonMasterItemName().v(), 
																																				x.getDisplayNumber(), 
																																				x.getUsageStartDate(), 
																																				x.getUsageEndDate(), 
																																				x.getNotUseCompanyList().stream()
																																										.map(t -> t.getCompanyId())
																																										.collect(Collectors.toList())))
																												.collect(Collectors.toList()));
			return screenBCommon;
		}else {
			throw new BusinessException("Msg_1578");
		}
	}
	
	/**
	 * 共通マスタの選択処理
	 * @param contractCd
	 * @param commonMasterId
	 * @return
	 * @author yennth
	 */
	public ScreenBSelectCommonMasterDto selectScreenBGetItem(String commonMasterId){
		String contractCd = AppContexts.user().contractCode();
		// グループ会社共通マスタ項目の取得
		List<GroupCommonMasterItem> getCommonMasterItem = services.getGroupCommonMasterItem(contractCd, commonMasterId);
		if(!getCommonMasterItem.isEmpty()) {
			ScreenBSelectCommonMasterDto screenBCommon = new ScreenBSelectCommonMasterDto(commonMasterId, getCommonMasterItem.stream()
																												.map(x -> new CommonMasterItemDto(x.getCommonMasterItemId(), 
																																				x.getCommonMasterItemCode().v(),
																																				x.getCommonMasterItemName().v(), 
																																				x.getDisplayNumber(), 
																																				x.getUsageStartDate(), 
																																				x.getUsageEndDate(), 
																																				x.getNotUseCompanyList().stream()
																																										.map(t -> t.getCompanyId())
																																										.collect(Collectors.toList())))
																												.collect(Collectors.toList()));
			return screenBCommon;
		}else {
			throw new BusinessException("Msg_1578");
		}
	}

	/**
	 * 
	 * @return
	 */
	public List<GroupCommonMasterDto> startPageA(Boolean isConfirmed) {
		// アルゴリズム [グループ会社共通マスタの取得] を実行する (Thực hiện thuật toán "Get master
		// common company group")
		String contractCode = AppContexts.user().contractCode();
		List<GroupCommonMasterDto> groupMasterDtos = this.services.getGroupCommonMaster(contractCode).stream()
				.map(x -> new GroupCommonMasterDto(x)).collect(Collectors.toList());

		if (groupMasterDtos.isEmpty()) {
			if (isConfirmed == null) {
				throw new BusinessException("Msg_1589");
			} else {
				if (isConfirmed) {
					//はい/Yes
					// アルゴリズム [グループ会社共通マスタの追加] を実行する
					List<GroupCommonMaster> newListMaster = addFixedItems(contractCode);
					groupMasterDtos = newListMaster.stream().map(x -> new GroupCommonMasterDto(x))
							.collect(Collectors.toList());
				} else {
					//いいえ / No
					throw new BusinessException("Msg_1590");
				}
			}
		}
		
		return groupMasterDtos.stream().sorted(Comparator.comparing(GroupCommonMasterDto::getCommonMasterCode))
				.collect(Collectors.toList());
	}
	
	public List<GroupCommonItemDto> getMasterItems(String commonMasterId) {
		// 画面情報を取得する(Get thông tin màn hình)
		String contractCode = AppContexts.user().contractCode();
		// アルゴリズム [グループ会社共通マスタ項目の取得] を実行する
		return this.services.getGroupCommonMasterItem(contractCode, commonMasterId).stream()
				.map(x -> new GroupCommonItemDto(x)).sorted(Comparator.comparing(GroupCommonItemDto::getDisplayNumber))
				.collect(Collectors.toList());
	}

	private List<GroupCommonMaster> addFixedItems(String contractCode) {
		// アルゴリズム [グループ会社共通マスタの追加] を実行する
		List<GroupCommonMaster> newListMaster = new ArrayList<GroupCommonMaster>();

		newListMaster.add(new GroupCommonMaster(new ContractCode(contractCode), "M000011", new CommonMasterCode("04"),
				new CommonMasterName("地域"), "部門マスタ、職場マスタ"));

		newListMaster.add(new GroupCommonMaster(new ContractCode(contractCode), "M000031", new CommonMasterCode("01"),
				new CommonMasterName("雇用形態"), "雇用マスタ"));

		newListMaster.add(new GroupCommonMaster(new ContractCode(contractCode), "M000041", new CommonMasterCode("02"),
				new CommonMasterName("分類区分"), "分類マスタ1"));

		newListMaster.add(new GroupCommonMaster(new ContractCode(contractCode), "M000051", new CommonMasterCode("03"),
				new CommonMasterName("職位グループ"), "職位マスタ"));

		this.services.addGroupCommonMaster(contractCode, newListMaster);
		
		return newListMaster;
	}
	
}
