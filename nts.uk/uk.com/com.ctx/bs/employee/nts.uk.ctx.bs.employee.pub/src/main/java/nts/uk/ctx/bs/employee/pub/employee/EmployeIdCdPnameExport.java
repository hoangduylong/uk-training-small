/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employee;

import lombok.Builder;
import lombok.Data;

/**
 * The Class EmployeeBasicInfoExport.
 */
@Data
@Builder
public class EmployeIdCdPnameExport {

	/** The emp id. */
	// 社員ID
	private String employeeId;

	/**
	 * tên biên là personName nhưng giá trị là của bussinessName (Do update tài
	 * lài chuyển từ pName -> BussinessName)
	 */
	// 個人名
	private String pName;

	/** The emp code. */
	// 社員コード
	private String employeeCode;

}
