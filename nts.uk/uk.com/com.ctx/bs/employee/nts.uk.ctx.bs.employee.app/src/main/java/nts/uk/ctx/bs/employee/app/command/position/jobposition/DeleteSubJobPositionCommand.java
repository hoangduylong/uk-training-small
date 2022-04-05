package nts.uk.ctx.bs.employee.app.command.position.jobposition;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteSubJobPositionCommand {

	
	/**職務職位ID（兼務） sub job position id*/
	@PeregRecordId
	private String subJobPosId;
	
}
