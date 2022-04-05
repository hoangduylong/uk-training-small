package nts.uk.ctx.bs.person.dom.person.personal.contact;

import lombok.Builder;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人連絡先.個人連絡先
 */
@Builder
@Getter
public class EmergencyContact extends DomainObject {

    /**
     * メモ
     */
    private Remark remark;

    /**
     * 連絡先名
     */
    private ContactName contactName;

    /**
     * 電話番号
     */
    private PhoneNumber phoneNumber;
    
}