/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.toppage.service;

import nts.uk.ctx.sys.portal.dom.toppage.Toppage;

/**
 * The Interface TopPageService.
 */
public interface TopPageService {
	
	/**
	 * Copy top page.
	 *
	 * @param topPage the top page
	 * @param companyId the company id
	 */
	void copyTopPage(Toppage topPage,String companyId,boolean isCheckOverWrite, String copyCode);
	
	/**
	 * Removes the top page.
	 *
	 * @param topPageCode the top page code
	 * @param companyId the company id
	 */
//	void removeTopPage(String topPageCode, String companyId);
}
