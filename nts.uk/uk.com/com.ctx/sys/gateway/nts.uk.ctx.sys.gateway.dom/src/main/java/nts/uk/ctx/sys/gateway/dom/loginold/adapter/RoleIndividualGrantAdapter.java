/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.adapter;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.gateway.dom.loginold.dto.RoleIndividualGrantImport;
import nts.uk.ctx.sys.gateway.dom.role.RoleType;

/**
 * The Interface RoleIndividualGrantAdapter.
 */
public interface RoleIndividualGrantAdapter {
	
	/**
	 * Gets the by user and role.
	 *
	 * @param userId the user id
	 * @param roleType the role type
	 * @return the by user and role
	 */
	RoleIndividualGrantImport getByUserAndRole (String userId,RoleType roleType);
		
	List<RoleIndividualGrantImport> getByUser(String userId);
	
	/**
	 * Gets the by user ID date role type.
	 *
	 * @param userID the user ID
	 * @param date the date
	 * @param roleType the role type
	 * @return the by user ID date role type
	 */
	List<RoleIndividualGrantImport> getByUserIDDateRoleType(String userId, GeneralDate date, int roleType);
	
	List<RoleIndividualGrantImport> getListDifRoleType(String userId, String companyId, int roleType, GeneralDate date);
	
	Optional<RoleIndividualGrantImport> getByRoleType(String userId, String companyId, int roleType, GeneralDate date);
}
