package nts.uk.ctx.bs.employee.app.command.temporaryabsence;

import java.math.BigDecimal;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class AddTemporaryAbsenceCommand{
	/**社員ID*/
	@PeregEmployeeId
	private String employeeId;
	
	/**休職休業ID*/
	@PeregRecordId
	private String histoyId;
	
	@PeregItem("IS00089")
	private BigDecimal tempAbsenceFrNo;
	
	/** 備考 */
	@PeregItem("IS00098")
	private String remarks;
	
	// TODO update later, in item define type is string but domain is integer
	@PeregItem("IS00097")
	private BigDecimal soInsPayCategory;
	
	// -------------- extend object ----------------------
	/**
	 * 出産種別 （産前休業の場合）
	 */
	@PeregItem("IS00092")
	private BigDecimal multiple;
	
	@PeregItem("IS00090")
	private BigDecimal sameFamily;
	
	@PeregItem("IS00093")
	private BigDecimal childType;

	@PeregItem("IS00094")
	private GeneralDate createDate;

	@PeregItem("IS00096")
	private BigDecimal spouseIsLeave;
	
	@PeregItem("IS00091")
	private BigDecimal sameFamilyDays;
	
	@PeregItem("IS00087")
	private GeneralDate startDate;
	
	@PeregItem("IS00088")
	private GeneralDate endDate;
	
	
	// TODO
//	@PeregItem("IS00095")
//	private Boolean childCareSameFamily;
//	
//
	@PeregItem("")
	private String familyMemberId;
}
