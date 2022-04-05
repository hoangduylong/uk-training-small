package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import lombok.Getter;

@Getter
public class CommonMasterCommand {
	// 共通マスタID
	private String commonMasterId;

	// 共通マスタコード
	private String commonMasterCode;

	// 共通マスタ名
	private String commonMasterName;

	// 備考
	private String commonMasterMemo;
}
