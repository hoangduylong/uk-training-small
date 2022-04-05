package nts.uk.ctx.bs.employee.app.command.jobtitle.affiliate;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteAffJobTitleMainCommand {

	//職位ID
	@PeregRecordId
	private String histId;
	
	@PeregEmployeeId
	private String employeeId;
}
