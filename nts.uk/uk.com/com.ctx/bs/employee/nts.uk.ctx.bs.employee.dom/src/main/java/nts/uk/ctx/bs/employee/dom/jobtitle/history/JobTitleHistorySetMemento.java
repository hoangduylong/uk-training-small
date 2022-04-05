/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.history;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface JobTitleHistorySetMemento.
 */
public interface JobTitleHistorySetMemento {

	/**
	 * Sets the history id.
	 *
	 * @param historyId the new history id
	 */
	public void setHistoryId(String historyId);

	/**
	 * Sets the period.
	 *
	 * @param period the new period
	 */
	public void setPeriod(DatePeriod period);
}
