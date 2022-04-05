package nts.uk.ctx.bs.employee.app.command.employment.history;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteEmploymentHistoryCommand {
	/** The history Id. */
	// 履歴ID
	@PeregRecordId
	private String historyId;
	
	/** The Employee Id. */
	// 社員ID
	@PeregEmployeeId
	private String employeeId;
}
