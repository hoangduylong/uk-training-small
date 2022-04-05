package nts.uk.ctx.bs.employee.app.command.familyrelatedinformation.socialinsurance;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class FamilySocialInsuranceCommand {
	
	/** 家族メンバーID */
	@PeregItem("")
	private String familyMemberId;
	
	/**  社員ID*/
	@PeregEmployeeId
	private String sid;
	
	/** 家族社会保険ID */
	@PeregRecordId
	private String socailInsuaranceId;
	
	/** 開始日 */
	@PeregItem("")
	private GeneralDate startDate;
	
	/** 終了日 */
	private GeneralDate endDate;
	
	/** 介護社会保険適用 */
	@PeregItem("")
	private boolean nursingCare;
	
	/** 健康保険被扶養者区分 */
	@PeregItem("")
	private boolean healthInsuranceDependent;
	
	/** 国民年金第3号資格者*/
	@PeregItem("")
	private boolean nationalPensionNo3;
	
	/** 基礎年金番号*/
	@PeregItem("")
	private String basicPensionNumber;
}
