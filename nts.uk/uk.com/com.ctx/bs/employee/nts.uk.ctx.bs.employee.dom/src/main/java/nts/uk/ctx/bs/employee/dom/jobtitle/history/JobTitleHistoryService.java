/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.history;

import nts.arc.time.GeneralDate;

/**
 * The Interface JobTitleHistoryService.
 */
public interface JobTitleHistoryService {
	
	/**
	 * Update history.
	 *
	 * @param companyId the company id
	 * @param historyId the history id
	 * @param endĐate the end đate
	 */
	void updateHistory(String companyId, String historyId, GeneralDate endĐate);
	
	/**
	 * Update lastest history.
	 *
	 * @param companyId the company id
	 * @param jobTitleId the job title id
	 * @param endĐate the end đate
	 */
	void updateLastestHistory(String companyId, String jobTitleId, GeneralDate endĐate);
}
