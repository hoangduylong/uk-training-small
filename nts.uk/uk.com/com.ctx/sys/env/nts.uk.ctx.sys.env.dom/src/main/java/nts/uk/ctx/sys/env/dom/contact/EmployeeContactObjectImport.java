package nts.uk.ctx.sys.env.dom.contact;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeContactObjectImport {

	// 社員ID
	private String sid;

	// メールアドレス
	private String mailAddress;

	// 座席ダイヤルイン
	private String seatDialIn;

	// 座席内線番号
	private String seatExtensionNo;

	// 携帯メールアドレス
	private String phoneMailAddress;

	// 携帯電話番号
	private String cellPhoneNo;
}
