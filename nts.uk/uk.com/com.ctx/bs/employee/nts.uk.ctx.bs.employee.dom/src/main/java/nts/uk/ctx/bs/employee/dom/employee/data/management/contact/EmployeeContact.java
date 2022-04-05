package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.primitive.PrimitiveValueBase;
import java.util.Optional;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.社員データ管理.社員連絡先.社員連絡先
 */
@Getter
public class EmployeeContact extends AggregateRoot {
    /**
     * 社員ID
     */
    private String employeeId;

    /**
     * メールアドレス
     */
    private Optional<MailAddress> mailAddress;

    /**
     * 座席ダイヤルイン
     */
    private Optional<SeatDialIn> seatDialIn;

    /**
     * 座席内線番号
     */
    private Optional<SeatExtensionNumber> seatExtensionNumber;

    /**
     * 携帯メールアドレス
     */
    private Optional<MailAddress> mobileMailAddress;

    /**
     * 携帯電話番号
     */
    private Optional<PhoneNumber> cellPhoneNumber;

    public static EmployeeContact createFromMemento(MementoGetter memento) {
        EmployeeContact domain = new EmployeeContact();
        domain.getMemento(memento);
        return domain;
    }

    public void getMemento(MementoGetter memento) {
        this.employeeId = memento.getEmployeeId();
        this.mailAddress = Optional.ofNullable(memento.getMailAddress() == null ? null : new MailAddress(memento.getMailAddress()));
        this.seatDialIn = Optional.ofNullable(memento.getSeatDialIn() == null ? null : new SeatDialIn(memento.getSeatDialIn()));
        this.seatExtensionNumber = Optional.ofNullable(memento.getSeatExtensionNumber() == null ? null : new SeatExtensionNumber(memento.getSeatExtensionNumber()));
        this.mobileMailAddress = Optional.ofNullable(memento.getMobileMailAddress() == null ? null : new MailAddress(memento.getMobileMailAddress()));
        this.cellPhoneNumber = Optional.ofNullable(memento.getCellPhoneNumber() == null ? null : new PhoneNumber(memento.getCellPhoneNumber()));
    }

    public void setMemento(MementoSetter memento) {
        memento.setEmployeeId(this.employeeId);
        memento.setMailAddress(this.mailAddress.map(PrimitiveValueBase::v).orElse(null));
        memento.setSeatDialIn(this.seatDialIn.map(PrimitiveValueBase::v).orElse(null));
        memento.setSeatExtensionNumber(this.seatExtensionNumber.map(PrimitiveValueBase::v).orElse(null));
        memento.setMobileMailAddress(this.mobileMailAddress.map(PrimitiveValueBase::v).orElse(null));
        memento.setCellPhoneNumber(this.cellPhoneNumber.map(PrimitiveValueBase::v).orElse(null));
    }

    public interface MementoSetter {
        void setEmployeeId(String employeeId);

        void setMailAddress(String mailAddress);

        void setSeatDialIn(String seatDialIn);

        void setSeatExtensionNumber(String seatExtensionNumber);

        void setMobileMailAddress(String mobileMailAddress);

        void setCellPhoneNumber(String cellPhoneNumber);
    }

    public interface MementoGetter {
        String getEmployeeId();

        String getMailAddress();

        String getSeatDialIn();

        String getSeatExtensionNumber();

        String getMobileMailAddress();

        String getCellPhoneNumber();
    }
}
