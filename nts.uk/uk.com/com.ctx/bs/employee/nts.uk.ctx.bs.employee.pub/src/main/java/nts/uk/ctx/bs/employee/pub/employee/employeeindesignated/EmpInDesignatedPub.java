/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employee.employeeindesignated;

import java.util.List;

import nts.arc.time.GeneralDate;

/**
 * The Interface EmpInDesignatedPub.
 */
public interface EmpInDesignatedPub {

	/**
	 * Gets the emp in designated.
	 *
	 * @param workplaceId the workplace id
	 * @param referenceDate the reference date
	 * @param empStatus the emp status
	 * @return the emp in designated
	 */
	// RequestList80
	List<EmployeeInDesignatedExport> getEmpInDesignated(String workplaceId, GeneralDate referenceDate, List<Integer> empStatus);
}
