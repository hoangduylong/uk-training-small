/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.ac.employee;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.employee.EmployeeBasicInfoExport;
import nts.uk.ctx.bs.employee.pub.employee.SyEmployeePub;
import nts.uk.ctx.bs.employee.pub.jobtitle.EmployeeJobHistExport;
import nts.uk.ctx.bs.employee.pub.jobtitle.SyJobTitlePub;
import nts.uk.ctx.bs.person.pub.person.PersonPub;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmpInfoImport;
import nts.uk.ctx.sys.auth.dom.employee.dto.EmJobTitleHisImport;
import nts.uk.ctx.sys.auth.dom.wkpmanager.EmpInfoAdapter;
import nts.uk.ctx.sys.auth.dom.wkpmanager.dom.EmpBasicInfoImport;
import nts.uk.ctx.sys.auth.dom.wkpmanager.dom.PersonInfoImport;
import nts.uk.shr.com.context.AppContexts;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class PersonInfoAdapterImpl.
 */
@Stateless
public class EmpInfoAdapterImpl implements EmpInfoAdapter {

	/** The person pub. */
	@Inject
	private PersonPub personPub;
	
	@Inject
	private SyEmployeePub syEmployeePub;

	@Inject
	private SyJobTitlePub syJobTitlePub;
	@Override
	public List<PersonInfoImport> getByListId(List<String> listPersonId) {
		return this.personPub.findByListId(listPersonId).stream()
				.map(item -> {					
					return PersonInfoImport.builder()
							.personId(item.getPersonId())
							.personName(item.getPersonName())
							.build();
				}).collect(Collectors.toList());
	}

	@Override
	public List<EmpBasicInfoImport> getListPersonInfo(List<String> listSid) {
		List<EmployeeBasicInfoExport> data = syEmployeePub.findBySIds(listSid);
		List<EmpBasicInfoImport> data1 = data.stream().map(c->coverEmpBasicInfoImport(c)).collect(Collectors.toList());
		List<String> listPid = data.stream().map(c->c.getPId()).collect(Collectors.toList());
		List<PersonInfoImport> listPerson = this.getByListId(listPid);
		for(EmpBasicInfoImport empBasicInfoImport:data1) {
			for(PersonInfoImport personInfoImport :listPerson) {
				if(empBasicInfoImport.getPId().equals(personInfoImport.getPersonId()))
					empBasicInfoImport.setNamePerson(personInfoImport.getPersonName());
			}
		}
		return data1;
	}
	
	/**
	 * Convert emp basic info import.
	 *
	 * @param empBasicInfoExport the emp basic info export
	 * @return the emp basic info import
	 */
	private EmpBasicInfoImport coverEmpBasicInfoImport(EmployeeBasicInfoExport empBasicInfoExport) {
		EmpBasicInfoImport empBasicInfoImport = new EmpBasicInfoImport(
				empBasicInfoExport.getPId(),
				null,
				empBasicInfoExport.getEmployeeId(),
				empBasicInfoExport.getPName(),
				empBasicInfoExport.getGender(),
				empBasicInfoExport.getBirthDay(),
				empBasicInfoExport.getEmployeeCode(),
				empBasicInfoExport.getEntryDate(),
				empBasicInfoExport.getRetiredDate()
				);
		return empBasicInfoImport;
	}

	@Override
	public List<EmpInfoImport> getEmpInfo(List<String> lstSid) {
		String companyID = AppContexts.user().companyId();
		return syEmployeePub.getEmpInfo(lstSid).stream()
			.map(x -> new EmpInfoImport(
					companyID, 
					x.getEmployeeCode(), 
					x.getEmployeeId(), 
					x.getPId(), 
					x.getBusinessName()))
			.collect(Collectors.toList());
	}

	@Override
	public List<String> getListEmployeeId(List<String> wkpIds, DatePeriod dateperiod) {
		return syEmployeePub.getListEmployeeId(wkpIds, dateperiod);
	}

	@Override
	public List<String> getListEmployee(List<String> jobTitleIds, GeneralDate baseDate) {
		return syEmployeePub.getListEmployee(jobTitleIds, baseDate);
	}

	@Override
	public Optional<EmJobTitleHisImport> getTitleHist(String employeeId, GeneralDate baseDate) {
		Optional<EmployeeJobHistExport> ex = syJobTitlePub.findBySid(employeeId, baseDate);
		if(ex.isPresent()){
			EmJobTitleHisImport data = new EmJobTitleHisImport(
					ex.get().getEmployeeId(),
					ex.get().getJobTitleID(),
					ex.get().getJobTitleName(), 
					ex.get().getStartDate(),
					ex.get().getEndDate());
			return Optional.of(data);
		}
		return Optional.empty();
		
	}

}