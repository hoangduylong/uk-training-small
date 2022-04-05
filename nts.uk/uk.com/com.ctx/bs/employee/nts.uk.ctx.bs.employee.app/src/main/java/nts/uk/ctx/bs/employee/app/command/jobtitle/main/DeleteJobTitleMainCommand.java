package nts.uk.ctx.bs.employee.app.command.jobtitle.main;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteJobTitleMainCommand {

	//職位ID
	@PeregRecordId
	private String jobTitleId;
}
