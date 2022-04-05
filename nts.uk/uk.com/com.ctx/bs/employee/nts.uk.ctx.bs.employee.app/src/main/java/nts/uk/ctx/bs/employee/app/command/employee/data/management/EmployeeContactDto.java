package nts.uk.ctx.bs.employee.app.command.employee.data.management;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;

/**
 * Command dto 社員連絡先
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeContactDto implements EmployeeContact.MementoSetter, EmployeeContact.MementoGetter {
    /**
     * 社員ID
     */
    private String employeeId;

    /**
     * メールアドレス
     */
    private String mailAddress;

    /**
     * 座席ダイヤルイン
     */
    private String seatDialIn;

    /**
     * 座席内線番号
     */
    private String seatExtensionNumber;

    /**
     * 携帯メールアドレス
     */
    private String mobileMailAddress;

    /**
     * 携帯電話番号
     */
    private String cellPhoneNumber;
}
