package nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface EmpWorkplaceHistoryAdapter {

	// RequestList30
	Optional<EmpWorkplaceHistoryImport> findBySid(String employeeID, GeneralDate baseDate);

	/** Request 157 */
	List<String> getListWorkPlaceIDByDate(GeneralDate referenceDate);

}
