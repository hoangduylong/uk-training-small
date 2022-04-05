/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking;

import lombok.Data;

/**
* The Class RoleSetLinkWebMenuExport.
* @author HieuNV
*/
@Data
public class RoleSetLinkWebMenuExport {

    /** ロールセットコード. */
    private String roleSetCd;

    /** メニューコードリスト */
    private String webMenuCode;

    /** 会社ID */
    private String companyId;

    public RoleSetLinkWebMenuExport(String companyId, String roleSetCd, String webMenuCode) {
        this.roleSetCd      = roleSetCd;
        this.webMenuCode    = webMenuCode;
        this.companyId      = companyId;
    }
}