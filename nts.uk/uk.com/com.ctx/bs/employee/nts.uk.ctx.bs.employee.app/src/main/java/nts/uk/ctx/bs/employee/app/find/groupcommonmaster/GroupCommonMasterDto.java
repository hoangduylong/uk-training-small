package nts.uk.ctx.bs.employee.app.find.groupcommonmaster;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMaster;

/**
 * 
 * @author sonnlb
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupCommonMasterDto {

	// 共通マスタID
	private String commonMasterId;

	// 共通マスタコード
	private String commonMasterCode;

	// 共通マスタ名
	private String commonMasterName;

	// 備考
	private String commonMasterMemo;

	public GroupCommonMasterDto(GroupCommonMaster domain) {
		this.commonMasterId = domain.getCommonMasterId();
		this.commonMasterCode = domain.getCommonMasterCode().v();
		this.commonMasterName = domain.getCommonMasterName().v();
		this.commonMasterMemo = domain.getCommonMasterMemo();
	}
}
