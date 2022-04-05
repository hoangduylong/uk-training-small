package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employee.employeelicense.ContractCode;

@Stateless
public class GroupCommonMasterDomainService {

	@Inject
	private GroupCommonMasterRepository groupMasterRepo;

	/**
	 * グループ会社共通マスタの取得
	 * 
	 * @param 契約コード
	 * 
	 * @return 共通マスタリスト(List)
	 */
	public List<GroupCommonMaster> getGroupCommonMaster(String contractCode) {

		// ドメインモデル [グループ会社共通マスタ] を取得する

		List<GroupCommonMaster> ListMaster = this.groupMasterRepo.getCommonMaster(contractCode);

		if (!CollectionUtil.isEmpty(ListMaster)) {
			return ListMaster.stream().sorted(Comparator.comparing(GroupCommonMaster::getCommonMasterCode))
					.collect(Collectors.toList());
		}

		return Collections.emptyList();

		// update sua tai lieu
		// // アルゴリズム [グループ会社共通マスタの追加] を実行する
		// List<GroupCommonMaster> newListMaster = new
		// ArrayList<GroupCommonMaster>();
		//
		// newListMaster.add(new GroupCommonMaster(new
		// ContractCode(contractCode), "M000011", new CommonMasterCode("04"),
		// new CommonMasterName("地域"), "部門マスタ、職場マスタ"));
		//
		// newListMaster.add(new GroupCommonMaster(new
		// ContractCode(contractCode), "M000031", new CommonMasterCode("01"),
		// new CommonMasterName("雇用形態"), "雇用マスタ"));
		//
		// newListMaster.add(new GroupCommonMaster(new
		// ContractCode(contractCode), "M000041", new CommonMasterCode("02"),
		// new CommonMasterName("分類区分"), "分類マスタ1"));
		//
		// newListMaster.add(new GroupCommonMaster(new
		// ContractCode(contractCode), "M000051", new CommonMasterCode("03"),
		// new CommonMasterName("職位グループ"), "職位マスタ"));
		//
		// this.addGroupCommonMaster(contractCode, newListMaster);
		//
		// return
		// newListMaster.stream().sorted(Comparator.comparing(GroupCommonMaster::getCommonMasterCode))
		// .collect(Collectors.toList());
	}

	/**
	 * グループ会社共通マスタの追加
	 * 
	 * @param 契約コード
	 * @param 共通マスタリスト
	 * 
	 */
	public void addGroupCommonMaster(String contractCode, List<GroupCommonMaster> ListMaster) {

		ListMaster.forEach(master -> {
			master.setContractCode(new ContractCode(contractCode));
		});

		this.groupMasterRepo.addListGroupCommonMaster(ListMaster);
	}

	/**
	 * グループ会社共通マスタ項目の取得
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * 
	 * @return 共通マスタリスト (List)
	 */
	public List<GroupCommonMasterItem> getGroupCommonMasterItem(String contractCode, String commonMasterId) {

		// ドメインモデル [グループ会社共通マスタ] を取得する
		Optional<GroupCommonMaster> masterOpt = this.groupMasterRepo.getByContractCodeAndId(contractCode,
				commonMasterId);

		if (!masterOpt.isPresent()) {
			return Collections.emptyList();
		}

		return masterOpt.get().getCommonMasterItems().stream()
				.sorted(Comparator.comparing(GroupCommonMasterItem::getCommonMasterItemCode))
				.collect(Collectors.toList());
	}

	/**
	 * グループ会社共通マスタ項目の使用設定の取得
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @param 会社ID
	 * @return
	 * 
	 * @return 共通マスタリスト
	 */
	public List<String> getGroupCommonMasterUsage(String contractCode, String commonMasterId, String companyId) {

		// ドメインモデル [グループ会社共通マスタ] を取得する
		Optional<GroupCommonMaster> masterOpt = this.groupMasterRepo.getByContractCodeAndId(contractCode,
				commonMasterId);

		if (!masterOpt.isPresent()) {
			return Collections.emptyList();
		}

		if (CollectionUtil.isEmpty(masterOpt.get().getCommonMasterItems())) {
			return Collections.emptyList();
		}

		return masterOpt.get().getCommonMasterItems().stream()
				.filter(x -> isMathCompanyId(x.getNotUseCompanyList(), companyId)).collect(Collectors.toList()).stream()
				.map(x -> x.getCommonMasterItemId()).collect(Collectors.toList());
	}

	/**
	 * グループ会社共通マスタ項目の使用設定の更新
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @param 会社ID
	 * @param 更新項目リスト
	 */
	public void updateGroupCommonMasterUsage(String contractCode, String commonMasterId, String companyId,
			List<String> masterItemIds) {

		Optional<GroupCommonMaster> commonMasterOpt = this.groupMasterRepo.getBasicInfo(contractCode, commonMasterId);

		if (!commonMasterOpt.isPresent()) {
			throw new BusinessException("Msg_1579");
		}

		// アルゴリズム [グループ会社共通マスタ項目の使用設定の取得] を実行する
		List<String> usageList = this.getGroupCommonMasterUsage(contractCode, commonMasterId, companyId);

		if (!CollectionUtil.isEmpty(usageList)) {
			// ドメインモデル [グループ会社共通マスタ] を削除する
			this.groupMasterRepo.removeGroupCommonMasterUsage(contractCode, commonMasterId, companyId, usageList);
		}
		// ドメインモデル [グループ会社共通マスタ] を追加する
		this.groupMasterRepo.addGroupCommonMasterUsage(contractCode, commonMasterId, companyId, masterItemIds);

	}

	/**
	 * 全ての共通マスタ項目の取得
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @return グループ会社共通マスタ
	 */
	public Optional<GroupCommonMaster> getAllCommonMasterItems(String contractCode, String commonMasterId) {
		// ドメインモデル [グループ会社共通マスタ] を取得する
		return this.groupMasterRepo.getByContractCodeAndId(contractCode, commonMasterId);
	}

	private boolean isMathCompanyId(List<NotUseCompanyList> notUseCompanyList, String companyId) {

		Optional<NotUseCompanyList> notUseCompanyOpt = notUseCompanyList.stream()
				.filter(x -> x.getCompanyId().equals(companyId)).findFirst();

		if (notUseCompanyOpt.isPresent()) {
			return true;
		}

		return false;
	}

	/**
	 * グループ会社共通マスタの更新
	 * 
	 * @param contractCd
	 * @param domains
	 * @author yennth
	 */
	public void updateGroupCommonMaster(String contractCd, List<GroupCommonMaster> domains) {
		this.groupMasterRepo.updateGroupCommonMaster(contractCd, domains);
	}

	/**
	 * グループ会社共通マスタ項目の追加
	 * 
	 * @param contractCd
	 * @author yennth
	 */
	public void addCommonMasterItem(String contractCd, String commonMasterId, List<GroupCommonMasterItem> domains) {
		this.groupMasterRepo.addCommonMasterItem(contractCd, commonMasterId, domains);
	}

	/**
	 * グループ会社共通マスタ項目の更新
	 * 
	 * @param contractCd
	 * @param commonMasterId
	 * @param domains
	 * @author yennth
	 */
	public void updateCommonMasterItem(String contractCd, String commonMasterId, List<GroupCommonMasterItem> domains) {
		this.groupMasterRepo.updateCommonMasterItem(contractCd, commonMasterId, domains);
	}

	/**
	 * 全ての共通マスタの項目の取得
	 */
	public List<GroupCommonMaster> getCommonMaster(String contractCd) {
		return this.groupMasterRepo.getCommonMaster(contractCd);
	}
}
