/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.person;

import java.util.List;

public interface PersonInfoAdapter {

	/**
	 * Gets the list person info.
	 *
	 * @param listPersonId the list person id
	 * @return the list person info
	 */
	List<PersonInfoImport> getListPersonInfo(List<String> listPersonId);
}
