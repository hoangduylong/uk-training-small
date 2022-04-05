/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuCode;

/**
 * ロールセット別紐付け - Class RoleSetLinkWenMenu
 * @author HieuNV
 */
@Getter
public class RoleSetLinkWebMenu extends AggregateRoot {

    /** ロールセットコード. */
    private RoleSetCode roleSetCd;

    /** メニューコードリスト */
    private WebMenuCode webMenuCd;

    /** 会社ID */
    private String companyId;

    /**
     * Instantiates a new default role set.
     * 
     * @param companyId
     * @param webMenuCd
     * @param roleSetCd
     */
    public RoleSetLinkWebMenu(String companyId, String roleSetCd, String webMenuCd) {
        super();
        this.roleSetCd = new RoleSetCode(roleSetCd);
        this.webMenuCd = new WebMenuCode(webMenuCd);
        this.companyId = companyId;
    }
}
