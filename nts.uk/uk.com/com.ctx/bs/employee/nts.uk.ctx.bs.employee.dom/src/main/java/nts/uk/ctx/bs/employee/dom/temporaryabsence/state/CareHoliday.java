/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.temporaryabsence.state;

import java.math.BigDecimal;

import lombok.Getter;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;

/**
 * @author danpv Domain Name : 介護休業
 *
 */
@Getter
public class CareHoliday extends TempAbsenceHisItem {

	/**
	 * 同一家族の休業有無
	 */
	private Boolean sameFamily;

	/**
	 * 同一家族の短時間勤務日数
	 */
	private Integer sameFamilyDays;

	public CareHoliday() {

	}

	/**
	 * @param sameFamily
	 * @param sameFamilyDays
	 * @param familyMemberId
	 */
	private CareHoliday(String historyId, String employeeId, GenericString remarks, Integer soInsPayCategory,
			Boolean sameFamily, Integer sameFamilyDays, String familyMemberId) {
		super(new TempAbsenceFrameNo(BigDecimal.valueOf(5)), historyId, employeeId, remarks, soInsPayCategory,
				familyMemberId);
		this.sameFamily = sameFamily;
		this.sameFamilyDays = sameFamilyDays;
	}

	public static CareHoliday init(String historyId, String employeeId, String remarks, Integer soInsPayCategory,
			Boolean sameFamily, Integer sameFamilyDays, String familyMemberId) {
		return new CareHoliday(historyId, employeeId, new GenericString(remarks), soInsPayCategory, sameFamily,
				sameFamilyDays, familyMemberId);
	}

}
