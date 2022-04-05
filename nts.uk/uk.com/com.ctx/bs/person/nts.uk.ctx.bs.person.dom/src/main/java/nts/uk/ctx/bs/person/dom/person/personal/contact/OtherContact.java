package nts.uk.ctx.bs.person.dom.person.personal.contact;

import lombok.Builder;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人連絡先.個人連絡先
 */
@Getter
@Builder
public class OtherContact extends DomainObject {

    /**
     * NO
     */
    private Integer otherContactNo;

    /**
     * 連絡先のアドレス
     */
    private OtherContactAddress address;
    
}
