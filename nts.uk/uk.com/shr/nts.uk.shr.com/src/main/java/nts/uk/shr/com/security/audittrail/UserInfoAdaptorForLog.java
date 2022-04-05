/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.security.audittrail;

import java.util.List;

import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;

public interface UserInfoAdaptorForLog {

	UserInfo findByEmployeeId(String employeeId);
	
	List<UserInfo> findByEmployeeId(List<String> employeeIds);

	UserInfo findByUserId(String userId);
	
	List<UserInfo> findByUserId(List<String> userIds);
	
	/**
	 * Find by employee id and company id.
	 *
	 * @param employeeId the employee id
	 * @param companyId the company id
	 * @return the user info
	 */
	UserInfo findByEmployeeIdAndCompanyId(String employeeId, String companyId);
}
