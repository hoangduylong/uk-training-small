package nts.uk.ctx.bs.employee.pub.groupcommonmaster.export;

import lombok.Data;
/**
 * グループ会社共通マスタ項目
 * @author yennth
 *
 */
@Data
public class GrpCmmMastItExport {
	
	// 共通項目ID
	private String commonMasterItemId;
	
	// 共通項目名
	private String commonMasterItemName;
	
	// 表示順
	private int displayNumber;

	public GrpCmmMastItExport(String commonMasterItemId, String commonMasterItemName, int displayNumber) {
		super();
		this.commonMasterItemId = commonMasterItemId;
		this.commonMasterItemName = commonMasterItemName;
		this.displayNumber = displayNumber;
	}
}
