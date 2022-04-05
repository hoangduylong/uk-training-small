/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.classification;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Interface ClassificationGetMemento.
 */
public interface ClassificationGetMemento {

	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	CompanyId getCompanyId();
	
	
	/**
	 * Gets the classification code.
	 *
	 * @return the classification code
	 */
	ClassificationCode getClassificationCode();
	
	
	/**
	 * Gets the classification name.
	 *
	 * @return the classification name
	 */
	ClassificationName getClassificationName();
	
	
	/**
	 * Gets the classification memo.
	 *
	 * @return the classification memo
	 */
	Memo getClassificationMemo();
}
