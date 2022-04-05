package entity.data.management.contact;

import lombok.Data;
import lombok.EqualsAndHashCode;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "BSYMT_CONTACT")
@EqualsAndHashCode(callSuper = true)
public class BsymtContactAddrEmp extends UkJpaEntity implements EmployeeContact.MementoGetter, EmployeeContact.MementoSetter, Serializable {

    private static final long serialVersionUID = 1L;

    // column 排他バージョン
    @Column(name = "EXCLUS_VER")
    private long version;

    // column 契約コード
    @Basic(optional = false)
    @Column(name = "CONTRACT_CD")
    private String contractCd;

    // Embedded primary key 社員ID + 会社ID
    @EmbeddedId
    private BsymtContactAddrEmpPK bsymtContactAddrEmpPK;

    @Basic(optional = false)
    @Column(name = "CID")
    private String companyId;

    // column メールアドレス
    @Basic(optional = true)
    @Column(name = "MAIL_ADDRESS")
    private String mailAddress;

    // column 座席ダイヤルイン
    @Basic(optional = true)
    @Column(name = "SEAT_DAIL_IN")
    private String seatDialIn;

    // column 座席内線番号
    @Basic(optional = true)
    @Column(name = "SEAT_EXTENSION_NUMBER")
    private String seatExtensionNumber;

    // column 携帯メールアドレス
    @Basic(optional = true)
    @Column(name = "PHONE_MAIL_ADDRESS")
    private String mobileMailAddress;

    // column 携帯電話番号
    @Basic(optional = true)
    @Column(name = "PHONE_NUMBER")
    private String cellPhoneNumber;

    @Override
    protected Object getKey() {
        return this.bsymtContactAddrEmpPK;
    }

    @Override
    public String getEmployeeId() {
        if (this.bsymtContactAddrEmpPK != null) {
            return this.bsymtContactAddrEmpPK.getEmployeeId();
        }
        return null;
    }

    @Override
    public void setEmployeeId(String employeeId) {
        if (this.bsymtContactAddrEmpPK == null) {
            this.bsymtContactAddrEmpPK = new BsymtContactAddrEmpPK();
        }
        this.bsymtContactAddrEmpPK.setEmployeeId(employeeId);
    }
}
