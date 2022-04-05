package nts.uk.ctx.bs.employee.app.command.workplace.affiliate;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteAffWorkplaceHistoryCommand {

	/** 社員ID */
	@PeregEmployeeId
	private String employeeId;

	/** The history Id. */
	// 履歴ID
	@PeregRecordId
	private String historyId;
}
