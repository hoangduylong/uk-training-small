/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.pub.webmenu;

import java.util.List;

/**
 * The Interface WebMenu.
 */
public interface WebMenuPub {

    /**
     * Get list of web menu by company id
     * @param companyId
     * @return
     */
    List<WebMenuExport> findByCompanyId(String companyId);
    
    /**
     * Find program names.
     * @param companyId
     * @return name list
     */
    List<ProgramNameDto> findProgramNames(String companyId);
}
