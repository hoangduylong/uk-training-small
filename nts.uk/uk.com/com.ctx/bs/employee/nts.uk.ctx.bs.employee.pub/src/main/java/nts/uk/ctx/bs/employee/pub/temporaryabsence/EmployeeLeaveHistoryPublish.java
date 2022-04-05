package nts.uk.ctx.bs.employee.pub.temporaryabsence;

import java.util.List;

import nts.arc.time.calendar.period.DatePeriod;

//社員の休職休業履歴Publish											
/**
 * 
 * @author HieuLt
 *
 */
public interface EmployeeLeaveHistoryPublish {


	
	/**
	 * [1] 期間を指定して休職期間を取得する
	 * @param lstEmpId
	 * @param datePeriod
	 * @return
	 */
	List<EmpLeavePeriodExport> getBySpecifyingPeriod(List<String> lstEmpId , DatePeriod datePeriod);
	/**
	 * [2] 期間を指定して休業期間を取得する
	 * @param lstEmpId
	 * @param datePeriod
	 * @return
	 */
	List<EmpLeaveWorkPeriodExport> getHolidayPeriod(List<String> lstEmpId , DatePeriod datePeriod);

}
