package nts.uk.ctx.bs.person.dom.person.personal.contact;

import lombok.Builder;
import lombok.Data;



/**
 * test dto 個人連絡先
 */
@Data
@Builder
public class EmergencyContactDto  {
    /**
     * メモ
     */
    private String remark;

    /**
     * 連絡先名
     */
    private String contactName;

    /**
     * 電話番号
     */
    private String phoneNumber;

}
