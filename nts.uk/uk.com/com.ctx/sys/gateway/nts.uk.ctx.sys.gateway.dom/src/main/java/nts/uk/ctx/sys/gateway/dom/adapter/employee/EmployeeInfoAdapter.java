/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.employee;

import java.util.List;

/**
 * The Interface EmployeeInfoAdapter.
 */
public interface EmployeeInfoAdapter {
	
	/**
	 * Gets the employees at work by base date.
	 *
	 * @param companyId the company id
	 * @param baseDate the base date
	 * @return the employees at work by base date
	 */
//	List<EmployeeInfoDtoImport> getEmployeesAtWorkByBaseDate(String companyId , GeneralDate baseDate);
	
	List<EmployeeInfoDtoImport> getEmployees(List<String> employeeIds);
	
	/**
	 * Gets the employee info.
	 *
	 * @param companyId the company id
	 * @param employeeCode the employee code
	 * @return the employee info
	 */
	EmployeeInfoDtoImport getEmployeeInfo(String companyId, String employeeCode);
	
	/**
	 * Gets the emp info by pid.
	 *
	 * @param pid the pid
	 * @return the emp info by pid
	 */
	List<EmployeeInfoDtoImport> getEmpInfoByPid(String pid);
}
