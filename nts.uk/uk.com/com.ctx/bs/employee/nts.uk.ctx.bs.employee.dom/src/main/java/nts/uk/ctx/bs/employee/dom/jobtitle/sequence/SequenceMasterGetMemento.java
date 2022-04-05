/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.sequence;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;

/**
 * The Interface SequenceMasterGetMemento.
 */
public interface SequenceMasterGetMemento {

	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	CompanyId getCompanyId() ;

	/**
	 * Gets the sequence code.
	 *
	 * @return the sequence code
	 */
	SequenceCode getSequenceCode();

	/**
	 * Gets the sequence name.
	 *
	 * @return the sequence name
	 */
	SequenceName getSequenceName();
	
	/**
	 * Gets the order.
	 *
	 * @return the order
	 */
	int getOrder();
}
