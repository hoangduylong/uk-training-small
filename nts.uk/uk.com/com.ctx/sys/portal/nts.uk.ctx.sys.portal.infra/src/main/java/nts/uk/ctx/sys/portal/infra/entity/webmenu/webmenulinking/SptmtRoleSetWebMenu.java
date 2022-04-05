/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.infra.entity.webmenu.webmenulinking;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * Class entity of table SacmtRoleSetWebMenu/SACMT_ROLESET_DEFAULT
 * @author HieuNV
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SPTMT_ROLE_SET_WEB_MENU")
public class SptmtRoleSetWebMenu extends ContractUkJpaEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    public SptmtRoleSetWebMenuPK roleSetWebMenuPK;

    @Override
    protected Object getKey() {
        return this.roleSetWebMenuPK;
    }

    /**
     * Build entity
     * @param roleSetWebMenuPK
     */
    public void buildEntity(SptmtRoleSetWebMenuPK roleSetWebMenuPK) {
        this.roleSetWebMenuPK = roleSetWebMenuPK;
    }
}
