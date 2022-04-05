/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking;

/**
 * ロールセット別紐付け- Class RoleSetAndWenMenu
 * @author HieuNV
 */
@lombok.Value
public class RoleSetLinkWebMenuImport {

    /** �?社ID */
    private String companyId;

    /** ロールセットコード. */
    private String roleSetCd;

    /** メニューコードリスト */
    private String webMenuCd;

    /**
     * Instantiates a new default role set.
     * 
     * @param companyId
     * @param roleSetCd
     * @param webMenuCd
     */
    public RoleSetLinkWebMenuImport(String companyId, String roleSetCd, String webMenuCd) {
        this.companyId = companyId;
        this.roleSetCd = roleSetCd;
        this.webMenuCd = webMenuCd;
    }
}
