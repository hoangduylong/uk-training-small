package nts.uk.ctx.sys.auth.app.find.employeeinfo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmployeeInfoAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmployeeInfoImport;

@Stateless
public class EmployeeInfomationFinder {

	/** The employee info adapter. */
	@Inject 
	private EmployeeInfoAdapter employeeInfoAdapter;
	
	/**
	 * Gets the employees at work by base date.
	 *
	 * @param companyId the company id
	 * @return the employees at work by base date
	 */
	public List<EmployeeInfoDto> getEmployeesAtWorkByBaseDate(String companyId){
		GeneralDate baseDate = GeneralDate.today();
		List<EmployeeInfoDto> listEmployeeInfo = new ArrayList<EmployeeInfoDto>();
		List<EmployeeInfoImport> listEmpInfoImport = employeeInfoAdapter.getEmployeesAtWorkByBaseDate(companyId, baseDate);
		
		listEmpInfoImport.stream().map(c -> {
			return listEmployeeInfo.add(new EmployeeInfoDto(c.getCompanyId(), c.getEmployeeCode(), c.getEmployeeId(), c.getEmployeeName(), c.getPersonId()));
		}).collect(Collectors.toList());
		return listEmployeeInfo;
	}
}
