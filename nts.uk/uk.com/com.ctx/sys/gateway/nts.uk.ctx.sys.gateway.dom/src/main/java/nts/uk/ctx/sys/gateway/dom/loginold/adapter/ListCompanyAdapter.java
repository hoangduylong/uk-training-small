/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.adapter;

import java.util.List;

/**
 * The Interface ListCompanyAdapter.
 */
public interface ListCompanyAdapter {
	
	/**
	 * Gets the list company id.
	 *
	 * @param userId the user id
	 * @param associatedPersonId the associated person id
	 * @return the list company id
	 */
	List<String> getListCompanyId(String userId,String associatedPersonId);
}
