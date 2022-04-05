package nts.uk.ctx.bs.employee.app.command.employee.history;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class AddAffCompanyHistoryCommand{
	/** 履歴ID */
	@PeregRecordId
	private String historyId;
	
	/** 社員ID */
	@PeregEmployeeId
	private String sId;
	
	/** 個人ID */
	@PeregPersonId
	private String pId;
	
	
	/** 採用区分 */
	@PeregItem("IS00023")
	private String recruitmentClassification;

	/** 本採用年月日 */
	@PeregItem("IS00022")
	private GeneralDate adoptionDate;

	/** 退職金計算開始日 */
	@PeregItem("IS00024")
	private GeneralDate retirementAllowanceCalcStartDate;

	/** 出向先データである */
	@PeregItem("")
	private boolean destinationData;
	
	@PeregItem("IS00020")
	private GeneralDate startDate;
	
	@PeregItem("IS00021")
	private GeneralDate endDate;
}
