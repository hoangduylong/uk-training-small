package nts.uk.ctx.bs.employee.app.find.groupcommonmaster;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
/**
 * 
 * @author yennth
 *
 */
@NoArgsConstructor
@Data
public class CommonMasterItemDto {
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
	
	// 会社別使用状態
	private List<String> useSetting;

	public CommonMasterItemDto(String commonMasterItemId, String commonMasterItemCode, String commonMasterItemName,
			int displayNumber, GeneralDate usageStartDate, GeneralDate usageEndDate, List<String> useSetting) {
		super();
		this.commonMasterItemId = commonMasterItemId;
		this.commonMasterItemCode = commonMasterItemCode;
		this.commonMasterItemName = commonMasterItemName;
		this.displayNumber = displayNumber;
		this.usageStartDate = usageStartDate;
		this.usageEndDate = usageEndDate;
		this.useSetting = useSetting;
	}
}
