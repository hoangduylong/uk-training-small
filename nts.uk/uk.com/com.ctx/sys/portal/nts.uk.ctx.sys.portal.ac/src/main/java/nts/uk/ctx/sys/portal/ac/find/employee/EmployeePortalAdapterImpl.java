package nts.uk.ctx.sys.portal.ac.find.employee;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmpInfoExport;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoPub;
import nts.uk.ctx.sys.portal.dom.adapter.employee.EmployeeAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.employee.EmployeeDto;
import nts.uk.ctx.sys.portal.dom.adapter.employee.ShortEmployeeDto;

@Stateless
public class EmployeePortalAdapterImpl implements EmployeeAdapter {
	
	@Inject
	private EmployeeInfoPub employeePub;
	
	@Override
	public Optional<EmployeeDto> getEmployee(String companyId, String personId) {
		return employeePub.getEmployeeInfoByCidPid(companyId, personId)
				.map(e -> new EmployeeDto(e.getCompanyId(), e.getPersonId(), e.getEmployeeId(),
						e.getEmployeeCode(), e.getDeletedStatus(), e.getDeleteDateTemporary(),
						e.getRemoveReason(), e.getExternalCode()));
	}
	
	@Override
	public List<ShortEmployeeDto> getEmployeesByPId(String personId) {
		List<EmpInfoExport> employees = employeePub.getEmpInfoByPid(personId);
		if (employees == null) return new ArrayList<>();
		return employees.stream().map(e -> new ShortEmployeeDto(e.getCompanyId(), 
					e.getEmployeeId(), e.getPId(), e.getEmployeeCode(), e.getPersonName()))
				.collect(Collectors.toList());
	}
}
