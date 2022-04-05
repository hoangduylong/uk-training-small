/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.workplace.service;

import nts.arc.time.GeneralDate;

/**
 * The Interface WorkplaceService.
 */
public interface WorkplaceService {

    /**
     * Update previous history.
     *
     * @param companyId the company id
     * @param prevHistId the prev hist id
     * @param endĐate the end đate
     */
    void updatePreviousHistory(String companyId, String prevHistId, GeneralDate endĐate);
    
    /**
     * Removes the wkp history.
     *
     * @param companyId the company id
     * @param lstWkpId the lst wkp id
     * @param startDate the start date
     */
    void removeWkpHistory(String companyId, String wkpId, GeneralDate startDate);
}
