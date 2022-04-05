/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.temporaryabsence.state;

import java.math.BigDecimal;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;

/**
 * @author danpv Domain Name : 産後休業 3
 *
 */
public class AfterChildbirth extends TempAbsenceHisItem {

	public AfterChildbirth() {
		super();
	}

	private AfterChildbirth(String historyId, String employeeId, GenericString remarks, Integer soInsPayCategory,
			String familyMemberId) {
		super(new TempAbsenceFrameNo(BigDecimal.valueOf(3)), historyId, employeeId, remarks, soInsPayCategory,
				familyMemberId);
	}

	public static AfterChildbirth init(String historyId, String employeeId, String remarks, Integer soInsPayCategory,
			String familyMemberId) {
		return new AfterChildbirth(historyId, employeeId, new GenericString(remarks), soInsPayCategory, familyMemberId);
	}

}
