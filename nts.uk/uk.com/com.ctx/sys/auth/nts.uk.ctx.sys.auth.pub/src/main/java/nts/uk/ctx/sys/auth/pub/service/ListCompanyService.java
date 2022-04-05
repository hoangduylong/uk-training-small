/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.service;

import java.util.List;

/**
 * The Interface ListCompanyService.
 */
public interface ListCompanyService {
	
	/**
	 * Gets the list company id.
	 *
	 * @param userId the user id
	 * @param associatedPersonId the associated person id
	 * @return the list company id
	 */
	List<String> getListCompanyId(String userId,String associatedPersonId);
}
