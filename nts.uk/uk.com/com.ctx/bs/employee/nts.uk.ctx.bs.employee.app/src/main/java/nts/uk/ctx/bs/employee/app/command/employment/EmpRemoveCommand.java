/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.employment;

import lombok.Data;

/**
 * Instantiates a new emp remove command.
 */
@Data
public class EmpRemoveCommand {

	/** The employment code. */
	private String employmentCode;
}
