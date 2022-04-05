/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.affiliate;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface AffiliationWorkplaceHistorySetMemento.
 */
public interface AffWorkplaceHistorySetMemento {
	
	/**
	 * Sets the.
	 *
	 * @param period the period
	 */
	void setPeriod(DatePeriod period);
	
	
	/**
	 * Sets the employee id.
	 *
	 * @param employeeId the new employee id
	 */
	void setEmployeeId(String employeeId);
	
	
	/**
	 * Sets the work place id.
	 *
	 * @param workplaceId the new work place id
	 */
	void setWorkplaceId(WorkplaceId workplaceId);

}
