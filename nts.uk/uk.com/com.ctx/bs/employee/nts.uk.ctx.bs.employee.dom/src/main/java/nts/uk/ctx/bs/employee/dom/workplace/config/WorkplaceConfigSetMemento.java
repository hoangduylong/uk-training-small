/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.config;

import java.util.List;

import nts.uk.shr.com.history.DateHistoryItem;

/**
 * The Interface WorkplaceConfigSetMemento.
 */
public interface WorkplaceConfigSetMemento {

	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	public void setCompanyId(String companyId);

	/**
	 * Sets the wkp config history.
	 *
	 * @param wkpConfigHistory the new wkp config history
	 */
	public void setWkpConfigHistory(List<DateHistoryItem> wkpConfigHistory);
}
