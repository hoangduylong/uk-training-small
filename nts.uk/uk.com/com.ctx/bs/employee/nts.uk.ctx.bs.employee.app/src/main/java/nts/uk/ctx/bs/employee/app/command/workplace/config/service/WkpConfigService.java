/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.workplace.config.service;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.config.WorkplaceConfigHistory;

/**
 * The Interface WkpConfigService.
 */
public interface WkpConfigService {

	/**
	 * Update prev history.
	 *
	 * @param companyId the company id
	 * @param prevHistId the prev hist id
	 * @param endĐate the end đate
	 */
    void updatePrevHistory(String companyId, String prevHistId, GeneralDate endĐate);
	
	/**
	 * Update wkp history if need.
	 *
	 * @param companyId the company id
	 * @param latestWkpConfigHist the latest wkp config hist
	 * @param newHistStartDate the new hist start date
	 */
    void updateWkpHistoryIfNeed(String companyId, WorkplaceConfigHistory latestWkpConfigHist,
            GeneralDate newHistStartDate);
}
