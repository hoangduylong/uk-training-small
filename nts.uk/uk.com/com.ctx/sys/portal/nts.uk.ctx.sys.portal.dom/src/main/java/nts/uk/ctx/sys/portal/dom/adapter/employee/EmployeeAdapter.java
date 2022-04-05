package nts.uk.ctx.sys.portal.dom.adapter.employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeAdapter {
	
	Optional<EmployeeDto> getEmployee(String companyId, String personId);
	
	List<ShortEmployeeDto> getEmployeesByPId(String personId);
}
