/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.employee;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.employee.SyEmployeePub;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoDtoExport;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoPub;
import nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoDtoImport;

/**
 * The Class GwEmployeeAdapterImpl.
 */
@Stateless
public class GwEmployeeAdapterImpl implements EmployeeInfoAdapter {

	/** The employee info pub. */
	@Inject
	private SyEmployeePub employeeInfoPub;

	@Inject
	private EmployeeInfoPub employeePub;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoAdapter#
	 * getEmployees(java.util.List)
	 */
	@Override
	public List<EmployeeInfoDtoImport> getEmployees(List<String> employeeIds) {
		return this.employeeInfoPub.findBySIds(employeeIds).stream().map(f -> {
			return new EmployeeInfoDtoImport("", f.getEmployeeCode(), f.getEmployeeId(), f.getPId());
		}).collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoAdapter#
	 * getEmployeesAtWorkByBaseDate(java.lang.String, nts.arc.time.GeneralDate)
	 */
	// @Override
	// public List<EmployeeInfoDtoImport> getEmployeesAtWorkByBaseDate(String
	// companyId, GeneralDate baseDate) {
	//
	// return this.employeeInfoPub.getEmployeesAtWorkByBaseDate(companyId,
	// baseDate).stream()
	// .map(f -> {
	// return new EmployeeInfoDtoImport(f.getCompanyId(), f.getEmployeeCode(),
	// f.getEmployeeId(), f.getPersonId());
	// })
	// .collect(Collectors.toList());
	// }

	@Override
	public EmployeeInfoDtoImport getEmployeeInfo(String companyId, String employeeCode) {
		//get EmployeeInfo
		Optional<EmployeeInfoDtoExport> f = this.employeePub.getEmployeeInfo(companyId, employeeCode);
		//check present
		if (f.isPresent()) {
			//return EmployeeDto
			return new EmployeeInfoDtoImport(f.get().getCompanyId(), f.get().getEmployeeCode(), f.get().getEmployeeId(),
					f.get().getPersonId());
		}
		return null;
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoAdapter#getEmpInfoByPid(java.lang.String)
	 */
	@Override
	public List<EmployeeInfoDtoImport> getEmpInfoByPid(String pid){
		return this.employeePub.getEmpInfoByPid(pid).stream().map(f -> {
			return new EmployeeInfoDtoImport(f.getCompanyId(), f.getEmployeeCode(), f.getEmployeeId(), f.getPId());
		}).collect(Collectors.toList());
	}
}
