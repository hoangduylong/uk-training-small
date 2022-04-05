/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.temporaryabsence;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.AfterChildbirth;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.AnyLeave;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.CareHoliday;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.ChildCareHoliday;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.GenericString;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.Leave;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.MidweekClosure;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.SickLeave;

/**
 * @author danpv Domain Name : 休職休業履歴項目
 *
 */
@Getter
public class TempAbsenceHisItem extends AggregateRoot {

	/**
	 * 休職休業枠NO
	 */
	private TempAbsenceFrameNo tempAbsenceFrNo;

	/**
	 * 履歴ID
	 */
	private String historyId;

	/**
	 * 社員ID
	 */
	private String employeeId;

	// ------------- Optional ----------------

	/**
	 * 備考
	 */
	private GenericString remarks;

	/**
	 * 社会保険支給対象区分
	 */
	private Integer soInsPayCategory;

	/**
	 * Optional 家族メンバーId Family member id
	 */
	private String familyMemberId;

	/**
	 * NoConstructor
	 */
	public TempAbsenceHisItem() {

	}

	/**
	 * @param historyId2
	 * @param employeeId2
	 * @param remarks2
	 * @param soInsPayCategory2
	 */
	public TempAbsenceHisItem(TempAbsenceFrameNo tempAbsenceFrNo, String historyId, String employeeId,
			GenericString remarks, Integer soInsPayCategory, String familyMemberId) {
		this.tempAbsenceFrNo = tempAbsenceFrNo;
		this.historyId = historyId;
		this.employeeId = employeeId;
		this.remarks = remarks;
		this.soInsPayCategory = soInsPayCategory;
		this.familyMemberId = familyMemberId;
	}

	public static TempAbsenceHisItem createTempAbsenceHisItem(int tempAbsenceFrNo, String historyId, String employeeId,
			String remarks, Integer soInsPayCategory, Boolean multiple, String familyMemberId, Boolean sameFamily,
			Integer childType, GeneralDate createDate, Boolean spouseIsLeave, Integer sameFamilyDays) {
		switch (tempAbsenceFrNo) {
		case 1:
			return Leave.init(historyId, employeeId, remarks, soInsPayCategory, familyMemberId);
		case 2:
			return MidweekClosure.init(historyId, employeeId, remarks, soInsPayCategory, multiple, familyMemberId);
		case 3:
			return AfterChildbirth.init(historyId, employeeId, remarks, soInsPayCategory, familyMemberId);
		case 4:
			return ChildCareHoliday.init(historyId, employeeId, remarks, soInsPayCategory, sameFamily, childType,
					familyMemberId, createDate, spouseIsLeave);
		case 5:
			return CareHoliday.init(historyId, employeeId, remarks, soInsPayCategory, sameFamily, sameFamilyDays,
					familyMemberId);
		case 6:
			return SickLeave.init(historyId, employeeId, remarks, soInsPayCategory, familyMemberId);
		case 7:
		case 8:
		case 9:
		case 10:
			return AnyLeave.init(tempAbsenceFrNo, historyId, employeeId, remarks, soInsPayCategory, familyMemberId);
		default:
			return null;
		}

	}

}
