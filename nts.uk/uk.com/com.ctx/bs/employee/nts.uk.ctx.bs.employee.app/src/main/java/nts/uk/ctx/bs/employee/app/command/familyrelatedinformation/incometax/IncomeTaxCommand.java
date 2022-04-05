package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.incometax;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class IncomeTaxCommand {
	
	/** 所得税ID */
	@PeregRecordId
	private String IncomeTaxID;
	
	/** 家族メンバーID */
	@PeregItem("")
	private String familyMemberId;
	
	/** 社員ID */
	@PeregEmployeeId
	private String sid;
	
	/** 期間 */
	@PeregItem("")
	private GeneralDate startDate;
	
	@PeregItem("")
	private GeneralDate endDate;
	
	/** 扶養者区分 */
	@PeregItem("")
	private boolean supporter;
	
	/** 障害区分*/
	@PeregItem("")
	private int disabilityType;
	
	/** 控除対象区分*/
	@PeregItem("")
	private int deductionTargetType;
}
