package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.care;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class FamilyCareCommand {
	
	/** 家族介護ID*/
	@PeregRecordId
	private String familyCareId;
	
	/** 家族ID */
	@PeregItem("")
	private String familyId;
	
	/** 社員ID */
	@PeregEmployeeId
	private String sid;
	
	/** 期間 */
	@PeregItem("")
	private GeneralDate startDate;
	
	@PeregItem("")
	private GeneralDate endDate;
	
	/** 支援介護区分*/
	@PeregItem("")
	private int careClassifi;
}
