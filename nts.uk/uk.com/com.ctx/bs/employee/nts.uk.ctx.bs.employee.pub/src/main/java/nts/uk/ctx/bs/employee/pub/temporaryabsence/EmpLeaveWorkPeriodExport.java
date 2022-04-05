package nts.uk.ctx.bs.employee.pub.temporaryabsence;

import lombok.Getter;

import nts.arc.time.calendar.period.DatePeriod;
/**
 * 社員の休業期間Exported
 * @author HieuLt
 *
 */
@Getter
public class EmpLeaveWorkPeriodExport {
	/** 社員ID **/
	private final String empID;
	/** 期間 **/
	private final DatePeriod datePeriod;
	/**枠NO**/ 
	private final int tempAbsenceFrameNo;
	public EmpLeaveWorkPeriodExport(String empID, DatePeriod datePeriod, int tempAbsenceFrameNo) {
		super();
		this.empID = empID;
		this.datePeriod = datePeriod;
		this.tempAbsenceFrameNo = tempAbsenceFrameNo;
	}
	

}
