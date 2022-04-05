/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.adapter;

import java.util.List;
import java.util.Optional;

import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactImport;

/**
 * The Interface PersonContactAdapter.
 */
public interface PersonContactAdapter {

	/**
	 * Gets the list contact.
	 *
	 * @param personIds the person ids
	 * @return the list contact
	 */
	List<PersonContactImport> getListContact(List<String> personIds);

	/**
	 * Register.
	 *
	 * @param person the person
	 */
	void register(PersonContactImport person);
	
	/**
	 * 取得する
	 * @param personId
	 * @return the person contact
	 */
	Optional<PersonContactImport> getPersonalContact(String personId);

}
