package nts.uk.ctx.bs.employee.dom.employee.employeelicense;

import java.util.Optional;

public interface EmployeeLicenseRepository {
		
	Optional<EmployeeLicense> findByKey(String contractCD);
}
