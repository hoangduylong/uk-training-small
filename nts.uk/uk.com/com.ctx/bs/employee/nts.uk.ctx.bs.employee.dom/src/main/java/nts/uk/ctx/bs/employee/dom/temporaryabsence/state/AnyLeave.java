/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.temporaryabsence.state;

import java.math.BigDecimal;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;

/**
 * @author danpv Domain Name : 任意休業
 */
public class AnyLeave extends TempAbsenceHisItem {

	/**
	 * @param historyId
	 * @param employeeId
	 * @param remarks
	 * @param soInsPayCategory
	 */
	private AnyLeave(int tempAbsenceFrNo, String historyId, String employeeId, GenericString remarks,
			Integer soInsPayCategory, String familyMemberId) {
		super(new TempAbsenceFrameNo(BigDecimal.valueOf(tempAbsenceFrNo)), historyId, employeeId, remarks,
				soInsPayCategory, familyMemberId);
	}

	public static AnyLeave init(int tempAbsenceFrNo, String historyId, String employeeId, String remarks,
			Integer soInsPayCategory, String familyMemberId) {
		return new AnyLeave(tempAbsenceFrNo, historyId, employeeId, new GenericString(remarks), soInsPayCategory,
				familyMemberId);
	}

}
