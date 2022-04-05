/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.employee.dto;

import lombok.Getter;

/**
 * The Class EmployeeDto.
 */
@Getter
public class EmployeeImport {

	//会社ID
	/** The company id. */
	private String companyId;

	//個人ID
	/** The personal id. */
	private String personalId;

	//社員ID
	/** The employee id. */
	private String employeeId;

	//社員コード
	/** The employee code. */
	private String employeeCode;

	// 個人名
	private String personalName;
	
	/**
	 * @param companyId
	 * @param personalId
	 * @param employeeId
	 * @param employeeCode
	 */
	public EmployeeImport(String companyId, String personalId, String employeeId, String employeeCode) {
		this.companyId = companyId;
		this.personalId = personalId;
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
	}
	
	/**
	 * @param personalName
	 * @param employeeId
	 * @param employeeCode
	 */
	public EmployeeImport(String personalName, String employeeId, String employeeCode) {
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
		this.personalName = personalName;
	}
	
	public EmployeeImport(String companyId, String personalId) {
		this.companyId = companyId;
		this.personalId = personalId;
	}
	public EmployeeImport(String companyId, String personalId, String employeeId, String employeeCode ,  String personalName) {
		this.companyId = companyId;
		this.personalId = personalId;
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
		this.personalName = personalName;
	}
}
