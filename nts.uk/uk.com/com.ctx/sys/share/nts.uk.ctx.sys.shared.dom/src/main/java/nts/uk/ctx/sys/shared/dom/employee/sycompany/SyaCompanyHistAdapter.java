package nts.uk.ctx.sys.shared.dom.employee.sycompany;

import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface SyaCompanyHistAdapter {

	Optional<SyaCompanyHistImport> find(String employeeId, GeneralDate baseDate);

}
