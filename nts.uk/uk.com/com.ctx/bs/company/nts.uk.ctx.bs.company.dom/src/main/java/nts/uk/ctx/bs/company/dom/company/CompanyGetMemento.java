/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.dom.company;

/**
 * The Interface CompanyGetMemento.
 */
public interface CompanyGetMemento {

	/**
	 * Gets the company code.
	 *
	 * @return the company code
	 */
	CompanyCode getCompanyCode();

	/**
	 * Gets the company name.
	 *
	 * @return the company name
	 */
	Name getCompanyName();
	
	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	CompanyId getCompanyId();	
	
	
	/**
	 * Gets the start month.
	 *
	 * @return the start month
	 */
	StartMonth getStartMonth();
}
