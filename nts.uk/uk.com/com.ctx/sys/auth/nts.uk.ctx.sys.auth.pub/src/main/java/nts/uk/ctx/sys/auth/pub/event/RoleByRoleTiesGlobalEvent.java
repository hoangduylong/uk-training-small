package nts.uk.ctx.sys.auth.pub.event;

import lombok.EqualsAndHashCode;
import lombok.Value;
import nts.arc.layer.dom.event.DomainEvent;

/** Event:会社管理者メニューを会社管理者ロールに紐付ける  */
@Value
@EqualsAndHashCode(callSuper = false)
public class RoleByRoleTiesGlobalEvent extends DomainEvent{
    
    /* ロールID */
    private String roleId;
    
    /* 会社ID */
    private String companyId;
}
