/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employee.employeeindesignated;

import lombok.Builder;
import lombok.Data;

/**
 * The Class EmployeeInDesignatedDto.
 */
@Data
@Builder
public class EmployeeInDesignatedDto {

	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	/** The status of emp. */
	// 在休退状態
	private int statusOfEmp;
}
