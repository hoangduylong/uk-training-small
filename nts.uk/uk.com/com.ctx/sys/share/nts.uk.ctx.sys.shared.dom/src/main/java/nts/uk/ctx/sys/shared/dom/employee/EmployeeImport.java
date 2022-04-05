/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.shared.dom.employee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoDtoExport;

/**
 * The Class EmployeeDto.
 */
@Getter
@Setter
@NoArgsConstructor
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
	
	// 削除フラグを追加
	// 影響を抑えるためコンストラクタは不使用
	/** 削除フラグ */
	private boolean isDeleted;
	
	// KDP003F: EmployeeName
	private String employeeName;

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
	 * @param companyId
	 * @param personalId
	 * @param employeeId
	 * @param employeeCode
	 */
	public EmployeeImport(String companyId, String personalId, String employeeId, String employeeCode, String employeeName) {
		this(companyId, personalId, employeeId, employeeCode);
		
		this.employeeName = employeeName;
	}
	
	public static EmployeeImport of(EmployeeInfoDtoExport export) {
		return new EmployeeImport(
				export.getCompanyId(), 
				export.getPersonId(), 
				export.getEmployeeId(),
				export.getEmployeeCode());
	}
}
