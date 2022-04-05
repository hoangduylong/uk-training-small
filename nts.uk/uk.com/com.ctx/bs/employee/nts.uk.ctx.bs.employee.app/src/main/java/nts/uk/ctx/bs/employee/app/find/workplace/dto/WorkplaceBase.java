/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.dto;

import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * The Class WorkplaceBaseDto.
 */
@Data
public class WorkplaceBase {

    /** The start date. */
    private GeneralDate startDate;
    
    /** The workplace id. */
    private String workplaceId;
}
