package nts.uk.ctx.sys.shared.ac;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.employee.SyEmployeePub;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataManageInfoAdapter;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataMngInfoImport;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class EmployeeDataManageInfoAdapterImpl implements EmployeeDataManageInfoAdapter {

	@Inject
	private SyEmployeePub employeePub;
	
	@Override
	public Optional<EmployeeDataMngInfoImport> findByEmployeeCode(String companyId, String employeeCode) {
		return employeePub.getSdataMngInfoByEmployeeCode(companyId, employeeCode)
				.map(EmployeeDataMngInfoImport::of);
	}

	@Override
	public Optional<EmployeeDataMngInfoImport> findByEmployeeId(String employeeId) {
		return employeePub.getSdataMngInfo(employeeId)
				.map(EmployeeDataMngInfoImport::of);
	}

}
