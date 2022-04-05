/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.infra.entity.webmenu.webmenulinking;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Class SacmtRoleSetWebMenu - Contain keys of the table.
 * @author HieuNV
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SptmtRoleSetWebMenuPK implements Serializable {

    private static final long serialVersionUID = 1L;

    /** �?社ID */
    @Basic(optional = false)
    @Column(name = "CID")
    public String companyId;

    /**メニューコードリスト */
    @Basic(optional = false)
    @Column(name = "WEB_MENU_CD")
    public String webMenuCd;

    /**コード */
    @Basic(optional = false)
    @Column(name = "ROLE_SET_CD")
    public String roleSetCd;
}
