package nts.uk.ctx.bs.employee.app.command.employee.contact;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteEmployeeInfoContactCommand {
	//社員ID
	@PeregRecordId
	private String sid;
}
