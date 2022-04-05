/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.temporaryabsence.state;

import java.math.BigDecimal;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;

/**
 * @author danpv Domain Name : 産前休業
 *
 */
public class MidweekClosure extends TempAbsenceHisItem {

	/**
	 * Type: Optional 多胎妊娠区分 Multiple pregnancy segment
	 */
	private Boolean multiple;

	public MidweekClosure() {
		super();
	}

	private MidweekClosure(String historyId, String employeeId, GenericString remarks, Integer soInsPayCategory,
			Boolean multiple, String familyMemberId) {
		super(new TempAbsenceFrameNo(BigDecimal.valueOf(2)), historyId, employeeId, remarks, soInsPayCategory,
				familyMemberId);
		this.multiple = multiple;
	}

	public static MidweekClosure init(String historyId, String employeeId, String remarks, Integer soInsPayCategory,
			Boolean multiple, String familyMemberId) {
		return new MidweekClosure(historyId, employeeId, new GenericString(remarks), soInsPayCategory, multiple,
				familyMemberId);
	}

	public Boolean getMultiple() {
		return multiple;
	}

	public void setMultiple(Boolean multiple) {
		this.multiple = multiple;
	}

}
