package nts.uk.ctx.sys.shared.dom.employee.syjobtitle;

import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface SyaJobHistAdapter {

	Optional<SyaJobHistImport> findBySid(String companyId, String employeeId, GeneralDate baseDate);
}
