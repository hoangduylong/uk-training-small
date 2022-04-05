/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle;

import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * Instantiates a new removes the job title command.
 */
@Data
public class RemoveJobTitleCommand {

    /** The job title id. */
    private String jobTitleId;
    
    /** The end date. */
    private GeneralDate endDate;	
}
