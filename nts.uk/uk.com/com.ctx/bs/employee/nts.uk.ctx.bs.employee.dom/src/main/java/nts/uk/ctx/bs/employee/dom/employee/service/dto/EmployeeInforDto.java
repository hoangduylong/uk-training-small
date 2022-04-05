/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class EmployeeInforDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeInforDto {
	/** The company id. */
	private String companyId;

	/** The employee code. */
	private String employeeCode;

	/** The employee id. */
	private String employeeId;

	/** The person Id. */
	private String personId = "";

	private String perName = "";
}
