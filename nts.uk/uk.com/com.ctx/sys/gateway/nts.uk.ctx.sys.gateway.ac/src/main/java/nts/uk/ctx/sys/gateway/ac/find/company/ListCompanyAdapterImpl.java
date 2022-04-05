/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.company;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.pub.service.ListCompanyService;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.ListCompanyAdapter;

/**
 * The Class ListCompanyAdapterImpl.
 */
@Stateless
public class ListCompanyAdapterImpl implements ListCompanyAdapter {

	/** The list company service. */
	@Inject
	private ListCompanyService listCompanyService;

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.login.adapter.ListCompanyAdapter#getListCompanyId(java.lang.String, java.lang.String)
	 */
	@Override
	public List<String> getListCompanyId(String userId, String associatedPersonId) {
		return listCompanyService.getListCompanyId(userId, associatedPersonId);
	}

}
