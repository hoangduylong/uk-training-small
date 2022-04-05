/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.adapter;

import java.util.Optional;

import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeBasicImport;

/**
 * The Interface EmployeeBasicAdapter.
 */
public interface EmployeeBasicAdapter {

	/**
	 * Gets the emp basic by S id.
	 *
	 * @param employeeId the employee id
	 * @return the emp basic by S id
	 */
	Optional<EmployeeBasicImport> getEmpBasicBySId(String employeeId);

}
