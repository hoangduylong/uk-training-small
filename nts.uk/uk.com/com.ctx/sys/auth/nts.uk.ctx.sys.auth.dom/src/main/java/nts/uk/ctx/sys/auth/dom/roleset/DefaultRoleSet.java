/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.roleset;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * 既定のロールセット - Class DefaultRoleSet
 * @author HieuNV
 */
@Getter
public class DefaultRoleSet extends AggregateRoot {

    /** 会社ID */
    private String companyId;

    /** ロールセットコード. */
    private RoleSetCode roleSetCd;

    /**
     * Instantiates a new default role set.
     * 
     * @param companyId
     * @param roleSetCd
     */
    public DefaultRoleSet(String companyId, String roleSetCd) {
        super();
        this.companyId = companyId;
        this.roleSetCd = new RoleSetCode(roleSetCd);
    }
}
