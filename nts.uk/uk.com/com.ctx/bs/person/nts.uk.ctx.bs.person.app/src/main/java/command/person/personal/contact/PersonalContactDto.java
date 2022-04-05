package command.person.personal.contact;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.bs.person.dom.person.personal.contact.ContactName;
import nts.uk.ctx.bs.person.dom.person.personal.contact.EmergencyContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.OtherContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.OtherContactAddress;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PhoneNumber;
import nts.uk.ctx.bs.person.dom.person.personal.contact.Remark;

/**
 * Command dto 個人連絡先
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonalContactDto implements PersonalContact.MementoSetter, PersonalContact.MementoGetter {

    /**
     * 個人ID
     */
    private String personalId;

    /**
     * メールアドレス
     */
    private String mailAddress;

    /**
     * 携帯メールアドレス
     */
    private String mobileEmailAddress;

    /**
     * 携帯電話番号
     */
    private String phoneNumber;

    /**
     * 緊急連絡先１
     */
    private EmergencyContactDto emergencyContact1;

    /**
     * 緊急連絡先２
     */
    private EmergencyContactDto emergencyContact2;

    /**
     * 他の連絡先
     */
    private List<OtherContactDto> otherContacts;

    @Override
    public void setEmergencyContact1(EmergencyContact emergencyContact) {
        this.emergencyContact1 = EmergencyContactDto.builder()
                .contactName(emergencyContact.getContactName().v())
                .phoneNumber(emergencyContact.getPhoneNumber().v())
                .remark(emergencyContact.getRemark().v())
                .build();
    }

    @Override
    public void setEmergencyContact2(EmergencyContact emergencyContact) {
        this.emergencyContact2 = EmergencyContactDto.builder()
                .contactName(emergencyContact.getContactName().v())
                .phoneNumber(emergencyContact.getPhoneNumber().v())
                .remark(emergencyContact.getRemark().v())
                .build();
    }

    @Override
    public void setOtherContacts(List<OtherContact> otherContacts) {
        this.otherContacts = otherContacts.stream()
                .map(otherContact -> OtherContactDto.builder()
                        .otherContactNo(otherContact.getOtherContactNo())
                        .address(otherContact.getAddress().v())
                        .build()
                ).collect(Collectors.toList());
    }

	@Override
	public String getPersonalId() {
		return this.personalId;
	}

	@Override
	public String getMailAddress() {
		return this.mailAddress;
	}

	@Override
	public String getMobileEmailAddress() {
		return this.mobileEmailAddress;
	}

	@Override
	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	@Override
	public EmergencyContact getEmergencyContact1() {
		return  EmergencyContact.builder()
				.contactName(new ContactName(this.emergencyContact1.getContactName()))
				.phoneNumber(new PhoneNumber(this.emergencyContact1.getPhoneNumber()))
				.remark(new Remark(this.emergencyContact1.getRemark()))
				.build();
	}

	@Override
	public EmergencyContact getEmergencyContact2() {
		return  EmergencyContact.builder()
				.contactName(new ContactName(this.emergencyContact2.getContactName()))
				.phoneNumber(new PhoneNumber(this.emergencyContact2.getPhoneNumber()))
				.remark(new Remark(this.emergencyContact2.getRemark()))
				.build();
	}

	@Override
	public List<OtherContact> getOtherContacts() {
		return this.otherContacts.stream()
				.map(item -> OtherContact.builder()
						.otherContactNo(item.getOtherContactNo())
						.address(new OtherContactAddress(item.getAddress()))
						.build())
				.collect(Collectors.toList());
	}

	@Override
	public void setPersonalId(String personalId) {
		this.personalId = personalId;
	}

	@Override
	public void setMailAddress(String mailAddress) {
		this.mailAddress = mailAddress;
	}

	@Override
	public void setMobileEmailAddress(String mobileEmailAddress) {
		this.mobileEmailAddress = mobileEmailAddress;
	}

	@Override
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}
