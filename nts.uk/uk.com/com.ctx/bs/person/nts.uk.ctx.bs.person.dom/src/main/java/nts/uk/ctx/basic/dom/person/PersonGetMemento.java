/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.dom.person;

import nts.uk.ctx.bs.person.dom.person.info.personnamegroup.PersonName;

/**
 * The Interface PersonGetMemento.
 */
public interface PersonGetMemento {
	
	/**
	 * Gets the person id.
	 *
	 * @return the person id
	 */
	String getPersonId();
	
	
	/**
	 * Gets the person name.
	 *
	 * @return the person name
	 */
	PersonName getPersonName();

}
