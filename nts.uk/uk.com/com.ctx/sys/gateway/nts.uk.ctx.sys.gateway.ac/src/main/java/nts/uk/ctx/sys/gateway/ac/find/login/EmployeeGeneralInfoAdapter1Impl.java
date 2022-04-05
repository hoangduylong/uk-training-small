/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.login;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.pub.generalinfo.EmployeeGeneralInfoDto;
import nts.uk.ctx.bs.employee.pub.generalinfo.EmployeeGeneralInfoPub;
import nts.uk.ctx.sys.gateway.dom.loginold.dto.EmployeeGeneralInfoAdapter;
import nts.uk.ctx.sys.gateway.dom.loginold.dto.EmployeeGeneralInfoImport;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class EmployeeGeneralInfoAdapter1Impl.
 */
@Stateless
public class EmployeeGeneralInfoAdapter1Impl implements EmployeeGeneralInfoAdapter{

	@Inject
	private EmployeeGeneralInfoPub employeeGeneralInfoPub;
	
	@Override
	public EmployeeGeneralInfoImport getEmployeeGeneralInfo(List<String> employeeIds, DatePeriod period,
			boolean checkEmployment, boolean checkClassification, boolean checkJobTitle, boolean checkWorkplace,
			boolean checkDepartment) {
		EmployeeGeneralInfoDto dto = employeeGeneralInfoPub.getPerEmpInfo(employeeIds, period, checkEmployment, checkClassification, checkJobTitle, checkWorkplace, checkDepartment);
		EmployeeGeneralInfoImport dataRetrun = new EmployeeGeneralInfoImport(CollectionUtil.isEmpty(dto.getEmploymentDto()) ? true : false, 
																			CollectionUtil.isEmpty(dto.getClassificationDto()) ? true : false,
																			CollectionUtil.isEmpty(dto.getJobTitleDto()) ? true : false,
																			CollectionUtil.isEmpty(dto.getWorkplaceDto()) ? true : false);
		return dataRetrun;
	}

}
