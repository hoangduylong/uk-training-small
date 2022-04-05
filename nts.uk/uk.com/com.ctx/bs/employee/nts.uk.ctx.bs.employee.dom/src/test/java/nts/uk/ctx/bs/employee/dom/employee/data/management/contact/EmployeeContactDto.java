package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

import lombok.Data;
import lombok.Builder;

/**
 * Dto 社員連絡先
 */
@Data
@Builder
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
     * メールアドレスが在席照会に表示するか
     */
    private Boolean isMailAddressDisplay;

    /**
     * 座席ダイヤルイン
     */
    private String seatDialIn;

    /**
     * 座席ダイヤルインが在席照会に表示するか
     */
    private Boolean isSeatDialInDisplay;

    /**
     * 座席内線番号
     */
    private String seatExtensionNumber;

    /**
     * 座席内線番号が在席照会に表示するか
     */
    private Boolean isSeatExtensionNumberDisplay;

    /**
     * 携帯メールアドレス
     */
    private String mobileMailAddress;

    /**
     * 携帯メールアドレスが在席照会に表示するか
     */
    private Boolean isMobileMailAddressDisplay;

    /**
     * 携帯電話番号
     */
    private String cellPhoneNumber;

    /**
     * 携帯電話番号が在席照会に表示するか
     */
    private Boolean isCellPhoneNumberDisplay;
}
