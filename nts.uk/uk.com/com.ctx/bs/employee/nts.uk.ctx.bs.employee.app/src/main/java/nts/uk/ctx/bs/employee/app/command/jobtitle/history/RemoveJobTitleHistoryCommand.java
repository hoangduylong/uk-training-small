/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.history;
import lombok.Data;

/**
 * The Class RemoveJobTitleHistoryCommand.
 */
@Data
public class RemoveJobTitleHistoryCommand {

    /** The job title id. */
    private String jobTitleId;
    
    /** The history id. */
    private String historyId;
}
