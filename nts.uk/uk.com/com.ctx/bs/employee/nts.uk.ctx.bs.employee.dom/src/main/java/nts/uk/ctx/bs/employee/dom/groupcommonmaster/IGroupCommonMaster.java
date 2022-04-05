package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import nts.arc.time.GeneralDate;

public interface IGroupCommonMaster {
	/**
	 * 使用している共通マスタの取得
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @param 会社ID
	 * @param 基準日
	 * @return グループ会社共通マスタ
	 */
	GroupCommonMasterExportDto getGroupCommonMasterEnableItem(String contractCode, String commonMasterId,
			String companyId, GeneralDate baseDate);
}
