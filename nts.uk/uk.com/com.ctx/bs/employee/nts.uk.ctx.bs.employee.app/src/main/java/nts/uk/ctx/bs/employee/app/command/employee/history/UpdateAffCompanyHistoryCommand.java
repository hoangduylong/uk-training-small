package nts.uk.ctx.bs.employee.app.command.employee.history;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class UpdateAffCompanyHistoryCommand{
	
	/** 
	 * 履歴ID 
	 */
	@PeregRecordId
	private String historyId;
	
	/**
	 *  社員ID 
	 */
	@PeregEmployeeId
	private String sId;
	
	/** 
	 * 個人ID 
	 */
	@PeregPersonId
	private String pId;
	
	/**
	 * 入社年月日
	 */
	@PeregItem("IS00020")
	private GeneralDate startDate;
	
	/**
	 * 退職年月日
	 */
	@PeregItem("IS00021")
	private GeneralDate endDate;
	
	/** 
	 * 本採用年月日
	 */
	@PeregItem("IS00022")
	private GeneralDate adoptionDate;
	
	/** 
	 * 採用区分 
	 */
	@PeregItem("IS00023")
	private String recruitmentClassification;

	/** 
	 * 退職金計算開始日 
	 * */
	@PeregItem("IS00024")
	private GeneralDate retirementAllowanceCalcStartDate;

}
