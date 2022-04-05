/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.adapter;

import java.util.List;

import nts.uk.ctx.sys.gateway.dom.loginold.dto.RoleImport;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

public interface RoleAdapter {
	
	/**
	 * Gets the all by id.
	 *
	 * @param roleId the role id
	 * @return the all by id
	 */
	List<RoleImport> getAllById(String roleId);
	
	public boolean isEmpWhetherLoginerCharge();
	
	public boolean isEmpWhetherLoginerCharge(LoginUserRoles roles);
}
