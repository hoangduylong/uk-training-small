package command.person.contact;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class UpdatePerContactCommand{
	//個人ID
	@PeregRecordId
	private String personId;
	
	//携帯電話番号
	@PeregItem("IS00262")
	private String cellPhoneNumber;
	
	//メールアドレス
	@PeregItem("IS00263")
	private String mailAdress;
	
	//携帯メールアドレス
	@PeregItem("IS00264")
	private String mobileMailAdress;
	
	//緊急連絡先１
	
	@PeregItem("IS00265")
	private String contactName1;
	
	@PeregItem("IS00266")
	private String phoneNumber1;
	
	@PeregItem("IS00267")
	private String memo1;
	
	//緊急連絡先2
	@PeregItem("IS00268")
	private String contactName2;
	
	@PeregItem("IS00269")
	private String phoneNumber2;
	
	@PeregItem("IS00270")
	private String memo2;
	
}
