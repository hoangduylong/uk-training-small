/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.status.employment;

import nts.arc.time.GeneralDate;

/**
 * The Interface StatusEmploymentAdapter.
 */
public interface StatusEmploymentAdapter {
	
	/**
	 * Gets the status of employment.
	 *
	 * @param employeeId the employee id
	 * @param referenceDate the reference date
	 * @return the status of employment
	 */
	StatusOfEmploymentImport getStatusOfEmployment(String employeeId, GeneralDate referenceDate);

}
