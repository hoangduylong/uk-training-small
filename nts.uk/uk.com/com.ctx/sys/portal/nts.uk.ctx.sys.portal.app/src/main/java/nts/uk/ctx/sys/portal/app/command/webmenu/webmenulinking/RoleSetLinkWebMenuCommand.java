/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.webmenu.webmenulinking;

import java.util.List;

import lombok.Value;

/**
* The Class RoleSetLinkWebMenuCommand.
* @author HieuNV
*/
@Value
public class RoleSetLinkWebMenuCommand {
    /** ロールセットコード. */
    private String roleSetCd;

    /** 会社ID */
    private String companyId;

    /** List of web menu code **/
    private List<String> webMenuCds;
}
