package nts.uk.ctx.bs.person.ac.employee;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.uk.ctx.bs.dom.adapter.employee.EmployeeBasicInfoAdapter;
import nts.uk.ctx.bs.dom.adapter.employee.EmployeeBasicInfoImport;
import nts.uk.ctx.bs.employee.pub.employee.SyEmployeePub;

@Stateless
public class EmployeeBasicInfoAdapterImpl  implements EmployeeBasicInfoAdapter{

	@Inject
	private SyEmployeePub employeeService;

	@Override
	public EmployeeBasicInfoImport get(String sid) {

		val  employee = employeeService.findBySId(sid);

		return new EmployeeBasicInfoImport(employee.getBirthDay(), employee.getEmployeeId(), employee.getEmployeeCode(), employee.getEntryDate(),
				employee.getGender(), employee.getPId(), employee.getPName(), employee.getRetiredDate());
	}

}
