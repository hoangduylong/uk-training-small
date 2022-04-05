package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import lombok.Getter;
import nts.arc.time.GeneralDate;

/**
 * 
 * @author yennth
 *
 */
@Getter
public class UpdateMasterItemCommand {
	// 共通項目ID
	private String commonMasterItemId;

	// 共通項目コード
	private String commonMasterItemCode;

	// 共通項目名
	private String commonMasterItemName;

	// 表示順
	private Integer displayNumber;

	// 使用開始日
	private String usageStartDate;

	// 使用終了日
	private String usageEndDate;

	public GeneralDate getUsageStartDate() {
		return GeneralDate.fromString(usageStartDate, "yyyy/MM/dd");
	}

	public GeneralDate getUsageEndDate() {
		return GeneralDate.fromString(usageEndDate, "yyyy/MM/dd");
	}
}
