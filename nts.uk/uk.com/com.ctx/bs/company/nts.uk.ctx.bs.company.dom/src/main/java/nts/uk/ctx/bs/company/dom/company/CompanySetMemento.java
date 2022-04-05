/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.dom.company;

public interface CompanySetMemento {
	
	/**
	 * Sets the company code.
	 *
	 * @param companyCode the new company code
	 */
	void setCompanyCode(CompanyCode companyCode);

	/**
	 * Sets the company name.
	 *
	 * @param companyName the new company name
	 */
	void setCompanyName(Name companyName);
	
	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	void setCompanyId(CompanyId companyId);
	
	
	
	/**
	 * Sets the start month.
	 *
	 * @param startMonth the new start month
	 */
	void setStartMonth(StartMonth startMonth);

}
