/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.dom.person;

import nts.uk.ctx.bs.person.dom.person.info.personnamegroup.PersonName;

/**
 * The Interface PersonSetMemento.
 */
public interface PersonSetMemento {
	
	/**
	 * Sets the person id.
	 *
	 * @param personId the new person id
	 */
	void setPersonId(String personId);
	
	
	/**
	 * Sets the person name.
	 *
	 * @param personName the new person name
	 */
	void setPersonName(PersonName personName);
}
