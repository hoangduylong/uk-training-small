/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.app.command.roleset;

import lombok.Value;

/**
* The Class DeleteRoleSetCommand.
* @author HieuNV
*/
@Value
public class DeleteRoleSetCommand {
    /** ロールセットコード. */
    private String roleSetCd;
}
