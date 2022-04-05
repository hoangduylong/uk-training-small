package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.incometax;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteIncomeTaxCommand {
	
	/** 所得税ID */
	@PeregRecordId
	private String IncomeTaxID;
}
