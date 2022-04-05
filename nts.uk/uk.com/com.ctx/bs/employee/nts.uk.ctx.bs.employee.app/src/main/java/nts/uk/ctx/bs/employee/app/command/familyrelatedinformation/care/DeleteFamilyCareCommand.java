package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.care;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteFamilyCareCommand {
	
	/** 家族介護ID*/
	@PeregRecordId
	private String familyCareId;
	
}
