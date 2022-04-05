/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.affiliate;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface AffiliationWorkplaceHistoryGetMemento.
 */
public interface AffWorkplaceHistoryGetMemento {
	
	/**
	 * Gets the period.
	 *
	 * @return the period
	 */
	DatePeriod getPeriod();
	
	
	/**
	 * Gets the employee id.
	 *
	 * @return the employee id
	 */
	String getEmployeeId();
	
	
	/**
	 * Gets the work place id.
	 *
	 * @return the work place id
	 */
	WorkplaceId getWorkplaceId();

}
