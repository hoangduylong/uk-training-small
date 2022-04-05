package find.person.contact;

import java.util.Optional;
import lombok.Setter;
import nts.uk.ctx.bs.person.dom.person.personal.contact.EmergencyContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

/**
 * 個人連絡先
 * 
 * @author xuan vinh
 *
 */

@Setter
public class PersonContactDto extends PeregDomainDto {

	/**
	 * 個人携帯電話番号
	 */
	@PeregItem("IS00262")
	private String cellPhoneNumber;

	/**
	 * 個人メールアドレス
	 */
	@PeregItem("IS00263")
	private String mailAdress;

	/**
	 * 個人携帯メールアドレス
	 */
	@PeregItem("IS00264")
	private String mobileMailAdress;

	/**
	 * 緊急連絡先名1
	 */
	@PeregItem("IS00265")
	private String emerContactName1;

	/**
	 * 緊急連絡先電話番号1
	 */
	@PeregItem("IS00266")
	private String emerPhoneNumber1;

	/**
	 * 緊急連絡先メモ1
	 */
	@PeregItem("IS00267")
	private String emerMemo1;

	/**
	 * 緊急連絡先名2
	 */
	@PeregItem("IS00268")
	private String emerContactName2;

	/**
	 * 緊急連絡先電話番号2
	 */
	@PeregItem("IS00269")
	private String emerPhoneNumber2;

	/**
	 * 緊急連絡先メモ2
	 */
	@PeregItem("IS00270")
	private String emerMemo2;

	public static PersonContactDto createFromDomain(PersonalContact domain) {
		PersonContactDto perContact = new PersonContactDto();
		perContact.setRecordId(domain.getPersonalId());
		if (domain.getPhoneNumber().isPresent()) {
			perContact.setCellPhoneNumber(domain.getPhoneNumber().get().v());
		}
		if (domain.getMailAddress().isPresent()) {
			perContact.setMailAdress(domain.getMailAddress().get().v());
		}
		if (domain.getMobileEmailAddress().isPresent()) {
			perContact.setMobileMailAdress(domain.getMobileEmailAddress().get().v());
		}

		Optional<EmergencyContact> emerContact1Opt = domain.getEmergencyContact1();
		perContact.setEmerMemo1(emerContact1Opt.map(item -> item.getRemark().v()).orElse(null));
		perContact.setEmerContactName1(emerContact1Opt.map(item -> item.getContactName().v()).orElse(null));
		perContact.setEmerPhoneNumber1(emerContact1Opt.map(item -> item.getPhoneNumber().v()).orElse(null));
		
		Optional<EmergencyContact> emerContact2Opt = domain.getEmergencyContact2();
		perContact.setEmerMemo2(emerContact2Opt.map(item -> item.getRemark().v()).orElse(null));
		perContact.setEmerContactName2(emerContact2Opt.map(item -> item.getContactName().v()).orElse(null));
		perContact.setEmerPhoneNumber2(emerContact2Opt.map(item -> item.getPhoneNumber().v()).orElse(null));
		return perContact;
	}
}
