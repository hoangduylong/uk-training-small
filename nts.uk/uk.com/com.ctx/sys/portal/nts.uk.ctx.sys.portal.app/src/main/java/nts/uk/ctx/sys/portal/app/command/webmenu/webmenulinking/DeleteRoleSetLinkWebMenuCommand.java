/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.webmenu.webmenulinking;

import lombok.Value;

/**
* The Class DeleteRoleSetLinkWebMenuCommand.
* @author HieuNV
*/
@Value
public class DeleteRoleSetLinkWebMenuCommand {
    /** ロールセットコード. */
    private String roleSetCd;
}
