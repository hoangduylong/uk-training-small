/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.config;

import java.util.List;

/**
 * The Interface WorkplaceConfigGetMemento.
 */
public interface WorkplaceConfigGetMemento {

	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	public String getCompanyId();

	/**
	 * Gets the wkp config history.
	 *
	 * @return the wkp config history
	 */
	public List<WorkplaceConfigHistory> getWkpConfigHistory();
}
