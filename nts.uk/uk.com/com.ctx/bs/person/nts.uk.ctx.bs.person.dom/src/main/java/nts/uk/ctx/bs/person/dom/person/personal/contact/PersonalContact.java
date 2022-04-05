package nts.uk.ctx.bs.person.dom.person.personal.contact;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.primitive.PrimitiveValueBase;

import java.util.List;
import java.util.Optional;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人連絡先.個人連絡先
 */
@Getter
public class PersonalContact extends AggregateRoot {

    /**
     * 個人ID
     */
    private String personalId;

    /**
     * メールアドレス
     */
    private Optional<MailAddress> mailAddress;

    /**
     * 携帯メールアドレス
     */
    private Optional<MailAddress> mobileEmailAddress;

    /**
     * 携帯電話番号
     */
    private Optional<PhoneNumber> phoneNumber;

    /**
     * 緊急連絡先１
     */
    private Optional<EmergencyContact> emergencyContact1;

    /**
     * 緊急連絡先２
     */
    private Optional<EmergencyContact> emergencyContact2;

    /**
     * 他の連絡先
     */
    private List<OtherContact> otherContacts;


    public static PersonalContact createFromMemento(MementoGetter memento) {
        PersonalContact domain = new PersonalContact();
        domain.getMemento(memento);
        return domain;
    }


    public void getMemento(MementoGetter memento) {
        this.personalId = memento.getPersonalId();
        this.mailAddress = Optional.ofNullable(memento.getMailAddress() == null ? null : new MailAddress(memento.getMailAddress()));
        this.mobileEmailAddress = Optional.ofNullable(memento.getMailAddress() == null ? null : new MailAddress(memento.getMobileEmailAddress()));
        this.phoneNumber = Optional.ofNullable(memento.getMailAddress() == null ? null : new PhoneNumber(memento.getPhoneNumber()));
        this.emergencyContact1 = Optional.ofNullable(memento.getEmergencyContact1());
        this.emergencyContact2 = Optional.ofNullable(memento.getEmergencyContact2());
        this.otherContacts = memento.getOtherContacts();
    }


    public void setMemento(MementoSetter memento) {
        memento.setPersonalId(this.personalId);
        memento.setMailAddress(this.mailAddress.map(PrimitiveValueBase::v).orElse(null));
        memento.setMobileEmailAddress(this.mobileEmailAddress.map(PrimitiveValueBase::v).orElse(null));
        memento.setPhoneNumber(this.phoneNumber.map(PrimitiveValueBase::v).orElse(null));
        memento.setEmergencyContact1(this.emergencyContact1.orElse(null));
        memento.setEmergencyContact2(this.emergencyContact2.orElse(null));
        memento.setOtherContacts(this.otherContacts);

    }

    public static interface MementoSetter {
        void setPersonalId(String personalId);

        void setMailAddress(String mailAddress);

        void setMobileEmailAddress(String mobileEmailAddress);

        void setPhoneNumber(String phoneNumber);

        void setEmergencyContact1(EmergencyContact emergencyContact1);

        void setEmergencyContact2(EmergencyContact emergencyContact2);

        void setOtherContacts(List<OtherContact> otherContacts);
    }

    public static interface MementoGetter {
        String getPersonalId();

        String getMailAddress();

        String getMobileEmailAddress();

        String getPhoneNumber();

        EmergencyContact getEmergencyContact1();

        EmergencyContact getEmergencyContact2();

        List<OtherContact> getOtherContacts();
    }
}
