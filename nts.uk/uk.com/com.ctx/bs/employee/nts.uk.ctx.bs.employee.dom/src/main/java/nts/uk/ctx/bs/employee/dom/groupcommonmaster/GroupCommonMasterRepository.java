package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface GroupCommonMasterRepository {

	/**
	 * グループ会社共通マスタの追加
	 * 
	 * @param グループ会社共通マスタ
	 *            (List)
	 */
	void addListGroupCommonMaster(List<GroupCommonMaster> domains);

	/**
	 * ドメインモデル [グループ会社共通マスタ] を取得する
	 * 
	 * @param 契約コード
	 * 
	 * @return 共通マスタリスト
	 */

	List<GroupCommonMaster> getByContractCode(String contractCode);

	/**
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @return グループ会社共通マスタ
	 */
	Optional<GroupCommonMaster> getByContractCodeAndId(String contractCode, String commonMasterId);

	/**
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @return グループ会社共通マスタ
	 */
	Optional<GroupCommonMaster> getBasicInfo(String contractCode, String commonMasterId);

	/**
	 * 使用している共通マスタの取得
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @param 会社ID
	 * @param 基準日
	 * @return
	 */
	List<GroupCommonMasterItem> getGroupCommonMasterEnableItem(String contractCode, String commonMasterId, String companyId,
			GeneralDate baseDate);

	/**
	 * グループ会社共通マスタ項目の使用設定を削除する
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @param 会社ID
	 * @param 更新項目リスト
	 */
	void removeGroupCommonMasterUsage(String contractCode, String commonMasterId, String companyId,
			List<String> masterItemIds);

	/**
	 * グループ会社共通マスタ項目の使用設定を追加する
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @param 会社ID
	 * @param 更新項目リスト
	 */
	void addGroupCommonMasterUsage(String contractCode, String commonMasterId, String companyId,
			List<String> masterItemIds);
	
	/**
	 * グループ会社共通マスタの更新
	 * 
	 * @param グループ会社共通マスタ(List)
	 * @author yennth
	 */
	void updateGroupCommonMaster(String contractCd, List<GroupCommonMaster> domains);
	
	/**
	 * グループ会社共通マスタ項目の追加
	 * @param contractCd
	 * @param commonMasterId
	 * @param domains
	 * @author yennth
	 */
	void addCommonMasterItem(String contractCd, String commonMasterId, List<GroupCommonMasterItem> domains);
	
	/**
	 * グループ会社共通マスタ項目の更新
	 * @param contractCd
	 * @param commonMasterId
	 * @param domains
	 * @author yennth
	 */
	void updateCommonMasterItem(String contractCd, String commonMasterId, List<GroupCommonMasterItem> domains);
	
	/**
	 * 全ての共通マスタの項目の取得
	 * @param contractCd
	 * @return
	 * @author yennth
	 */
	List<GroupCommonMaster> getCommonMaster(String contractCd);

}
