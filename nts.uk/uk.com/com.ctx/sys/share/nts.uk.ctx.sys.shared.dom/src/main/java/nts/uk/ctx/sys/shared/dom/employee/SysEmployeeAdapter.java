/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.shared.dom.employee;

import java.util.Optional;

/**
 * The Interface SysEmployeeAdapter.
 */
public interface SysEmployeeAdapter {

	/**
	 * Gets the current info by scd.
	 *
	 * @param companyId the company id
	 * @param employeeCode the employee code
	 * @return the current info by scd
	 */
	Optional<EmployeeImport> getCurrentInfoByScd(String companyId,String employeeCode);

	/**
	 * Gets the by pid.
	 *
	 * @param companyId the company id
	 * @param pid the pid
	 * @return the by pid
	 */
	Optional<EmployeeImport> getByPid(String companyId, String pid);
	
	/**
	 * Gets the sdata mng info.
	 *
	 * @param cid the cid
	 * @param pid the pid
	 * @return the sdata mng info
	 */
	Optional<EmployeeDataMngInfoImport> getSdataMngInfo(String sid);
	
	/**
	 * Gets the status of employee.
	 *
	 * @param sid the sid
	 * @return the status of employee
	 */
	StatusOfEmployeeImport getStatusOfEmployee(String sid);
	
	/**
	 * Gets the employee by sid.
	 *
	 * @param sid the sid
	 * @return the employee by sid
	 */
	Optional<EmployeeImportNew> getEmployeeBySid(String sid);
}
