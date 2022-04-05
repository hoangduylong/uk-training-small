/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.grant;

import lombok.Getter;

/**
 * The Class RoleIndividualGrantExport.
 */

@Getter
public class RoleIndividualGrantExport {

	/** The role id. */
	public String roleId;

	/**
	 * @param roleId
	 */
	public RoleIndividualGrantExport(String roleId) {
		this.roleId = roleId;
	}
}
