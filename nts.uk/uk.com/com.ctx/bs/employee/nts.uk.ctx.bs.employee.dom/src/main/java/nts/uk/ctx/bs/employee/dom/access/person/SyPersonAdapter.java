/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.access.person;

import java.util.List;

import nts.uk.ctx.bs.employee.dom.access.person.dto.PersonImport;

/**
 * The Interface PersonAdapter.
 */
public interface SyPersonAdapter {

	/**
	 * Find by person ids.
	 *
	 * @param personIds the person ids
	 * @return the list
	 */
	List<PersonImport> findByPersonIds(List<String> personIds);
}
