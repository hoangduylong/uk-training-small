/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.grant;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

/**
 * The Interface RoleIndividualGrantExportRepo.
 */
public interface RoleIndividualGrantExportRepo {
	
	/**
	 * Gets the by user and role type.
	 *
	 * @param userId the user id
	 * @param roleType the role type
	 * @return the by user and role type
	 */
	RoleIndividualGrantExport getByUserAndRoleType(String userId,Integer roleType);
		
	List<RoleIndividualGrantExport> getByUser(String userId);
	
	Optional<RoleIndividualGrantExport> getByUserCompanyRoleTypeDate(
			String userId, String companyId, int roleType, GeneralDate date);
	
	List<RoleIndividualGrantEx> getByUserIDDateRoleType(String userID, GeneralDate date , int roleType);
	/**
	 * @author hoatt
	 * @param userId
	 * @param companyId
	 * @param roleType
	 * @param date
	 * @return
	 */
	List<RoleIndividualGrantEx> getListDifRoleType(String userId, String companyId, int roleType, GeneralDate date);
	/**
	 * @author hoatt
	 * @param userId
	 * @param companyId
	 * @param roleType
	 * @param date
	 * @return
	 */
	Optional<RoleIndividualGrantEx> findByUserCompanyRoleTypeDate(String userId, String companyId, int roleType, GeneralDate date);
}
