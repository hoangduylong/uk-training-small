/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.dto;

import lombok.Getter;

/**
 * The Class RoleIndividualGrantImport.
 */
@Getter
public class RoleIndividualGrantImport {
	
	/** The role id. */
	private String roleId;

	/**
	 * @param roleId
	 */
	public RoleIndividualGrantImport(String roleId) {
		this.roleId = roleId;
	}
}
