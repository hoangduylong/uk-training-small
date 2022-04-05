package nts.uk.ctx.bs.employee.pub.contact;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class EmployeeContactObject {

	//社員ID
	private String sid;
	
	//メールアドレス
	private String mailAddress;
	
	//座席ダイヤルイン
	private String seatDialIn;
	
	//座席内線番号
	private String seatExtensionNo;
	
	//携帯メールアドレス
	private String phoneMailAddress;
	
	//携帯電話番号
	private String cellPhoneNo;
}
