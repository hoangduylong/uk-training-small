package nts.uk.ctx.bs.person.pub.contact;


import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PersonContactObject {

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
	
	// 他の連絡先
	private List<OtherContact> otherContacts;

}
