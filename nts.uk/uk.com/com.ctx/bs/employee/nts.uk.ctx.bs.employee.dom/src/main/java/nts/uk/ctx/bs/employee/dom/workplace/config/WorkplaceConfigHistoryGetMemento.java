/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.config;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface WorkplaceConfigHistoryGetMemento.
 */
public interface WorkplaceConfigHistoryGetMemento {

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
