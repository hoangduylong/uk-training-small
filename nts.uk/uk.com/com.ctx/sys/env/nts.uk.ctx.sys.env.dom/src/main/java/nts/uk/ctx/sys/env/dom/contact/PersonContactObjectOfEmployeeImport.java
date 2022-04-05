package nts.uk.ctx.sys.env.dom.contact;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PersonContactObjectOfEmployeeImport {

	//社員ID
	private String employeeId;

	// 個人ID
	private String personId;

	// 携帯電話番号
	private String cellPhoneNumber;

	// メールアドレス
	private String mailAdress;

	// 携帯メールアドレス
	private String mobileMailAdress;

	// 緊急連絡先１
	private String memo1;

	private String contactName1;

	private String phoneNumber1;

	// 緊急連絡先2
	private String memo2;

	private String contactName2;

	private String phoneNumber2;
}
