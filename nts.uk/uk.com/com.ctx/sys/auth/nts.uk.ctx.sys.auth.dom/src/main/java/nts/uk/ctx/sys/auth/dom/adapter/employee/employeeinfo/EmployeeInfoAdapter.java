package nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo;

import java.util.List;
import java.util.Optional;
import nts.arc.time.GeneralDate;

public interface EmployeeInfoAdapter {

	List<EmployeeInfoImport> getEmployeesAtWorkByBaseDate(String companyId, GeneralDate baseDate);
	
	Optional<EmpInfoByCidSidImport> getEmpInfoBySidCid(String pid, String cid);
	
	Optional<EmpInfoImport> getByComnyIDAndEmployeeCD (String companyID , String employeeCD);

	EmployeeInformationImport findEmployeeInformation(String employeeId, GeneralDate baseDate);
	
}