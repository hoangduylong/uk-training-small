/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.history;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface JobTitleHistoryGetMemento.
 */
public interface JobTitleHistoryGetMemento {

	/**
	 * Gets the history id.
	 *
	 * @return the history id
	 */
	public String getHistoryId();

	/**
	 * Gets the period.
	 *
	 * @return the period
	 */
	public DatePeriod getPeriod();
}
