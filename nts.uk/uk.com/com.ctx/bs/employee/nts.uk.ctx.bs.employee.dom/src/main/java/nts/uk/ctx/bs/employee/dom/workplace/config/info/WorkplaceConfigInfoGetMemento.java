/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.config.info;

import java.util.List;

/**
 * The Interface WorkPlaceConfigInfoGetMemento.
 */
public interface WorkplaceConfigInfoGetMemento {

	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	public String getCompanyId();

	/**
     * Gets the history id.
     *
     * @return the history id
     */
    public String getHistoryId();

	/**
     * Gets the wkp hierarchy.
     *
     * @return the wkp hierarchy
     */
    public List<WorkplaceHierarchy> getWkpHierarchy();
}
