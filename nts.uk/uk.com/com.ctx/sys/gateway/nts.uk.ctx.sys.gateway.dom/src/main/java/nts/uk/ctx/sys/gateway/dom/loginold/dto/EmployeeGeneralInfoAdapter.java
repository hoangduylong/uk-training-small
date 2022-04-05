/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.dto;

import java.util.List;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface EmployeeGeneralInfoAdapter.
 */
public interface EmployeeGeneralInfoAdapter {
	EmployeeGeneralInfoImport getEmployeeGeneralInfo(List<String> employeeIds, DatePeriod period,boolean checkEmployment,
			boolean checkClassification, boolean checkJobTitle, boolean checkWorkplace, boolean checkDepartment);
}
