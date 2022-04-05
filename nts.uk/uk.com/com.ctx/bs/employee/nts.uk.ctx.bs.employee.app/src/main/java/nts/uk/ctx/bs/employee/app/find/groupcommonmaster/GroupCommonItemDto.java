package nts.uk.ctx.bs.employee.app.find.groupcommonmaster;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterItem;

/**
 * 
 * @author sonnlb
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupCommonItemDto {
	// 共通項目ID
	private String commonMasterItemId;

	// 共通項目コード
	private String commonMasterItemCode;

	// 共通項目名
	private String commonMasterItemName;

	// 表示順
	private int displayNumber;

	// 使用開始日
	private GeneralDate usageStartDate;

	// 使用終了日
	private GeneralDate usageEndDate;

	// 使用設定
	private int useSetting;

	public GroupCommonItemDto(GroupCommonMasterItem domain) {
		this.commonMasterItemId = domain.getCommonMasterItemId();
		this.commonMasterItemCode = domain.getCommonMasterItemCode().v();
		this.commonMasterItemName = domain.getCommonMasterItemName().v();
		this.displayNumber = domain.getDisplayNumber();
		this.usageStartDate = domain.getUsageStartDate();
		this.usageEndDate = domain.getUsageEndDate();
		this.useSetting = 0;
	}
}
