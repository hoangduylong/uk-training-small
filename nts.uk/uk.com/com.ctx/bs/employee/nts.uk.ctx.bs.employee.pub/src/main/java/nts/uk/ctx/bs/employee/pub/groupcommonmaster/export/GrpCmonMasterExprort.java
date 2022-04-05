package nts.uk.ctx.bs.employee.pub.groupcommonmaster.export;

import java.util.List;

import lombok.Data;
/**
 * グループ会社共通マスタ export
 * @author yennth
 *
 */
@Data
public class GrpCmonMasterExprort {
	
	// 共通マスタ名
	private String commonMasterName;
	
	// 共通マスタ項目
	private List<GrpCmmMastItExport> commonMasterItems;

	public GrpCmonMasterExprort(String commonMasterName, List<GrpCmmMastItExport> commonMasterItems) {
		super();
		this.commonMasterName = commonMasterName;
		this.commonMasterItems = commonMasterItems;
	}
}
