/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.temporaryabsence.state;

import java.math.BigDecimal;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;

/**
 * @author danpv Domain Name : 休職
 *
 */
public class Leave extends TempAbsenceHisItem {

	/**
	 * @param historyId
	 * @param employeeId
	 * @param remarks
	 * @param soInsPayCategory
	 */
	private Leave(String historyId, String employeeId, GenericString remarks, Integer soInsPayCategory,
			String familyMemberId) {
		super(new TempAbsenceFrameNo(BigDecimal.valueOf(1)), historyId, employeeId, remarks, soInsPayCategory,
				familyMemberId);
	}

	public static Leave init(String historyId, String employeeId, String remarks, Integer soInsPayCategory,
			String familyMemberId) {
		return new Leave(historyId, employeeId, new GenericString(remarks), soInsPayCategory, familyMemberId);
	}

}
