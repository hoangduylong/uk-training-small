/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.workplace.config;

import java.util.List;

import nts.uk.ctx.bs.employee.dom.workplace.config.WorkplaceConfigGetMemento;
import nts.uk.ctx.bs.employee.dom.workplace.config.WorkplaceConfigHistory;

/**
 * The Class JpaWorkplaceConfigGetMemento.
 */
public class JpaWorkplaceConfigGetMemento implements WorkplaceConfigGetMemento {

	/** The company id. */
	private String companyId;
	
	/** The lst workplace config history. */
	private List<WorkplaceConfigHistory> lstWorkplaceConfigHistory;
	
	/**
	 * Instantiates a new jpa workplace config get memento.
	 *
	 * @param companyId the company id
	 * @param lstWorkplaceConfigHistory the lst workplace config history
	 */
	public JpaWorkplaceConfigGetMemento(String companyId,List<WorkplaceConfigHistory> lstWorkplaceConfigHistory) {
		this.companyId = companyId;
		this.lstWorkplaceConfigHistory = lstWorkplaceConfigHistory;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.workplace.config.WorkplaceConfigGetMemento#getCompanyId()
	 */
	@Override
	public String getCompanyId() {
		return this.companyId;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.workplace.config.WorkplaceConfigGetMemento#getWkpConfigHistory()
	 */
	@Override
	public List<WorkplaceConfigHistory> getWkpConfigHistory() {
		return this.lstWorkplaceConfigHistory;
	}

}
