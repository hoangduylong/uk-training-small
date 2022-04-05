package nts.uk.ctx.bs.employee.app.command.department;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteAffiliationDepartmentCommand {

	/** The id. */
	@PeregRecordId
	private String historyId;
	/** The employee id. */
	@PeregEmployeeId
	private String employeeId;
}
