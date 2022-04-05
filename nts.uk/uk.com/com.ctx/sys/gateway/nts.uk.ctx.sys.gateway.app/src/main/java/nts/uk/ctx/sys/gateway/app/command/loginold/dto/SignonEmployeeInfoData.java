/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.command.loginold.dto;

import nts.uk.ctx.sys.shared.dom.company.CompanyInformationImport;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeImportNew;

/**
 * The Class SignonEmployeeInfoData.
 */
public class SignonEmployeeInfoData {

	/** The company information import. */
	public CompanyInformationImport companyInformationImport;
	
	/** The employee import new. */
	public EmployeeImportNew employeeImportNew;

	/**
	 * Instantiates a new signon employee info data.
	 *
	 * @param companyInformationImport the company information import
	 * @param employeeImportNew the employee import new
	 */
	public SignonEmployeeInfoData(CompanyInformationImport companyInformationImport,
			EmployeeImportNew employeeImportNew) {
		super();
		this.companyInformationImport = companyInformationImport;
		this.employeeImportNew = employeeImportNew;
	}
}
