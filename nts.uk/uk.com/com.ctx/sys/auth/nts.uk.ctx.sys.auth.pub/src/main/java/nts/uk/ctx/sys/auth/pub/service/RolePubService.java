/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.service;

import nts.arc.time.GeneralDate;

/**
 * The Interface RolePubService.
 */
public interface RolePubService {
	
	/**
	 * Gets the employee reference range.
	 *
	 * @param userId the user id
	 * @param roleType the role type
	 * @param baseDate the base date
	 * @return the employee reference range
	 */
	EmployeeReferenceRangePub getEmployeeReferenceRange(String userId,Integer roleType,GeneralDate baseDate);
}
