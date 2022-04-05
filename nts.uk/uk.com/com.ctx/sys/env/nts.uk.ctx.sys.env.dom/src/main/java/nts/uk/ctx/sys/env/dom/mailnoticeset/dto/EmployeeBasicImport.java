/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

import lombok.Getter;

/**
 * The Class EmployeeBasicImport.
 */
//社員 (Import)
@Getter
public class EmployeeBasicImport {

	/** The employee id. */
	private String employeeId;

	/** The employee code. */
	private String employeeCode;

	/** The employee name. */
	private String employeeName;

	/**
	 * Instantiates a new employee basic import.
	 *
	 * @param employeeId
	 *            the employee id
	 * @param employeeCode
	 *            the employee code
	 * @param employeeName
	 *            the employee name
	 */
	public EmployeeBasicImport(String employeeId, String employeeCode, String employeeName) {
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
		this.employeeName = employeeName;
	}

}
