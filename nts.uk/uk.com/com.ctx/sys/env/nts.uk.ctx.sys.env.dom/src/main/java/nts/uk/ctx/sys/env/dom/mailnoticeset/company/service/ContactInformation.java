package nts.uk.ctx.sys.env.dom.mailnoticeset.company.service;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.env.dom.mailnoticeset.company.ContactName;

/**
 * 連絡先情報DTO
 * 
 * @author nws-ducnt
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactInformation {
	/** 会社の携帯メールアドレス */
	private Optional<String> companyMobileEmailAddress;
	
	/** 個人の携帯メールアドレス */
	private Optional<String> personalMobileEmailAddress;
	
	/** 個人のメールアドレス */
	private Optional<String> personalEmailAddress;
	
	/** 会社のメールアドレス */
	private Optional<String> companyEmailAddress;
	
	/** 他の連絡先 */
	private List<OtherContactInfomation> otherContactsInfomation;
	
	/** 座席ダイヤルイン */
	private ContactName seatDialIn;
	
	/** 座席内線番号 */
	private ContactName seatExtensionNumber;
	
	/** 緊急連絡先1 */
	private Optional<String> emergencyNumber1;
	
	/** 緊急連絡先2 */
	private Optional<String> emergencyNumber2;
	
	/** 個人の携帯電話番号 */
	private Optional<String> personalMobilePhoneNumber;
	
	/** 会社の携帯電話番号 */
	private Optional<String> companyMobilePhoneNumber;

}
