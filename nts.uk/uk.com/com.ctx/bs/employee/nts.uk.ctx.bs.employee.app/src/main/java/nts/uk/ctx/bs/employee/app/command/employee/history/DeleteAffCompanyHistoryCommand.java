package nts.uk.ctx.bs.employee.app.command.employee.history;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteAffCompanyHistoryCommand {
	/** 履歴ID */
	@PeregRecordId
	private String historyId;
	
	/** 社員ID */
	@PeregEmployeeId
	private String sId;
	
	/** 個人ID */
	@PeregPersonId
	private String pId;
	
}
