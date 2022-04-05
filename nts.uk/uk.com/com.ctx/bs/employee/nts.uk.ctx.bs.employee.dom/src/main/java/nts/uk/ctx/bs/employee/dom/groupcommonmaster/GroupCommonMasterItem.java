package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import java.util.List;

import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * グループ会社共通マスタ項目
 * 
 * @author sonnlb
 *
 */
@Data
public class GroupCommonMasterItem {

	// 共通項目ID
	private String commonMasterItemId;

	// 共通項目コード
	private CommonMasterItemCode commonMasterItemCode;

	// 共通項目名
	private CommonMasterItemName commonMasterItemName;

	// 表示順
	private int displayNumber;

	// 使用開始日
	private GeneralDate usageStartDate;

	// 使用終了日
	private GeneralDate usageEndDate;

	// 会社別使用状態
	private List<NotUseCompanyList> notUseCompanyList;

	public GroupCommonMasterItem(String commonMasterItemId, CommonMasterItemCode commonMasterItemCode,
			CommonMasterItemName commonMasterItemName, int displayNumber, GeneralDate usageStartDate,
			GeneralDate usageEndDate) {
		super();
		this.commonMasterItemId = commonMasterItemId;
		this.commonMasterItemCode = commonMasterItemCode;
		this.commonMasterItemName = commonMasterItemName;
		this.displayNumber = displayNumber;
		this.usageStartDate = usageStartDate;
		this.usageEndDate = usageEndDate;
	}
	
	public static GroupCommonMasterItem creatFromJavaType(String commonMasterItemId, String commonMasterItemCode,
			String commonMasterItemName, int displayNumber, GeneralDate usageStartDate,
			GeneralDate usageEndDate) {
		return new GroupCommonMasterItem(commonMasterItemId, new CommonMasterItemCode(commonMasterItemCode), 
											new CommonMasterItemName(commonMasterItemName), displayNumber, usageStartDate, usageEndDate);
	}
}
