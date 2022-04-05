package nts.uk.ctx.bs.employee.app.command.jobtitle.main;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class JobTitleMainCommand {

	@PeregEmployeeId
	private String sid;
	/** The job title id. */
	//職位ID
	@PeregRecordId
	private String jobTitleId;
	
	@PeregItem("")
	private String historyId;
	
	/** The job title history. */
	@PeregItem("")
	private GeneralDate startDate;
	
	@PeregItem("")
	private GeneralDate endDate;

}
