/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.infra.entity.roleset;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Class SacmtRolesetDefault - Contain key elements of table SACMT_ROLESET_DEFAULT
 * @author Hieu.NV
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SacmtDefaultRoleSetPK implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 会社ID */
    @Basic(optional = false)
    @Column(name = "CID")
    public String companyId;

}
