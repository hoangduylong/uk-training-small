/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employee.employeeindesignated;

import lombok.Builder;
import lombok.Data;

/**
 * The Class EmployeeInDesignatedExport.
 */
@Data
@Builder
// 指定職場の指定在籍状態の社員を取得
// Export class for Request List #80
public class EmployeeInDesignatedExport {
	
	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	/** The status of emp. */
	// 在休退状態
	private int statusOfEmp;
	
}
