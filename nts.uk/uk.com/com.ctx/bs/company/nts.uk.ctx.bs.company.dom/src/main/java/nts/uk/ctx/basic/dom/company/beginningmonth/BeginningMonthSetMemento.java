/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.dom.company.beginningmonth;

import nts.uk.ctx.bs.company.dom.company.CompanyId;
import nts.uk.ctx.bs.company.dom.company.StartMonth;

/**
 * The Interface BeginningMonthSetMemento.
 */
public interface BeginningMonthSetMemento {
	
	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	void setCompanyId(CompanyId companyId);

	/**
	 * Sets the month.
	 *
	 * @param startMonth the new month
	 */
	void setMonth(StartMonth startMonth);

}
