package nts.uk.ctx.bs.employee.app.command.jobtitle.affiliate;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class AddAffJobTitleMainCommand {
	// 社員ID
	@PeregEmployeeId
	private String sid;
	
	/** The job title code. */
	// 職位コード
	@PeregItem("IS00079")
	private String jobTitleId;
	
	/** The AffJobHistoryItemNote. */
	// 備考
	@PeregItem("IS00080")
	private String note;
	
	@PeregRecordId
	private String historyId;
	
	/** The job title history. */
	@PeregItem("IS00077")
	private GeneralDate startDate;
	
	@PeregItem("IS00078")
	private GeneralDate endDate;
}
