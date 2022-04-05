package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.employee.dom.employee.employeelicense.ContractCode;

/**
 * グループ会社共通マスタ
 * 
 * @author sonnlb
 *
 * 
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GroupCommonMaster extends AggregateRoot {

	// 契約コード
	private ContractCode contractCode;

	// 共通マスタID
	private String commonMasterId;

	// 共通マスタコード
	private CommonMasterCode commonMasterCode;

	// 共通マスタ名
	private CommonMasterName commonMasterName;

	// 備考
	private String commonMasterMemo;

	// 共通マスタ項目

	private List<GroupCommonMasterItem> commonMasterItems;

	public GroupCommonMaster(ContractCode contractCode, String commonMasterId, CommonMasterCode commonMasterCode,
			CommonMasterName commonMasterName, String commonMasterMemo) {
		this.contractCode = contractCode;
		this.commonMasterId = commonMasterId;
		this.commonMasterCode = commonMasterCode;
		this.commonMasterName = commonMasterName;
		this.commonMasterMemo = commonMasterMemo;
	}
	
	public static GroupCommonMaster creatFromJavaType(String contractCode, String commonMasterId, String commonMasterCode,
			String commonMasterName, String commonMasterMemo) {
		return new GroupCommonMaster( new ContractCode(contractCode), commonMasterId, new CommonMasterCode(commonMasterCode), new CommonMasterName(commonMasterName), commonMasterMemo);
	}
}
