/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.workplace.history;

import lombok.Data;

/**
 * The Class DeleteWkpHistoryCommand.
 */
@Data
public class DeleteWkpHistoryCommand {
    
    /** The workplace id. */
    private String workplaceId;
    
    /** The history id. */
    private String historyId;
}
