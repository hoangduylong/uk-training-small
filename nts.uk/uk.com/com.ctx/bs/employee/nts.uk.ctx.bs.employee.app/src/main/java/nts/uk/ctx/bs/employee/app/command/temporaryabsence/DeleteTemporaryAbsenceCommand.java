package nts.uk.ctx.bs.employee.app.command.temporaryabsence;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteTemporaryAbsenceCommand {

	/**社員ID*/
	@PeregEmployeeId
	private String employeeId;
	
	/**休職休業ID*/
	@PeregRecordId
	private String histoyId;
	
}
