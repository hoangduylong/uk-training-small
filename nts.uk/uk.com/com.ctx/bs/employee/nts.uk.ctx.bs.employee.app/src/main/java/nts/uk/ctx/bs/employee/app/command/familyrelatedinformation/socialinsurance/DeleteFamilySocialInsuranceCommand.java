package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.socialinsurance;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteFamilySocialInsuranceCommand {
	
	/** 家族社会保険ID */
	@PeregRecordId
	private String socailInsuaranceId;
	
}
