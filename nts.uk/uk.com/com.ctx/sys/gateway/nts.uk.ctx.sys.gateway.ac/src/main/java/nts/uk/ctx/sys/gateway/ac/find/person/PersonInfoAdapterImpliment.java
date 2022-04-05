/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.person;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.person.pub.person.PersonPub;
import nts.uk.ctx.sys.gateway.dom.adapter.person.PersonInfoAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.person.PersonInfoImport;

/**
 * The Class PersonInfoAdapterImpl.
 */
@Stateless
public class PersonInfoAdapterImpliment implements PersonInfoAdapter {

	/** The person pub. */
	@Inject
	private PersonPub personPub;

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.person.PersonInfoAdapter#getListPersonInfo(java.util.List)
	 */
	@Override
	public List<PersonInfoImport> getListPersonInfo(List<String> listPersonId) {
		return this.personPub.findByPersonIds(listPersonId).stream().map(f -> {
			return new PersonInfoImport(f.getPersonId(), f.getBusinessName());
		}).collect(Collectors.toList());

	}
}
