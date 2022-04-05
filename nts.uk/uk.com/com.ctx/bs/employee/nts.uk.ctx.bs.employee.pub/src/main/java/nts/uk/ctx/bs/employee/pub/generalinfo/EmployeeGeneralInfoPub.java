package nts.uk.ctx.bs.employee.pub.generalinfo;

import java.util.List;

import nts.arc.time.calendar.period.DatePeriod;

public interface EmployeeGeneralInfoPub {
	
	/**
	 * RequestList 401
	 * 社員ID（List）と期間から個人情報を取得する
	 * 
	 * @param employeeIds
	 * @param period
	 * @return
	 */
	EmployeeGeneralInfoDto getPerEmpInfo(List<String> employeeIds, DatePeriod period, boolean checkEmployment,
			boolean checkClassification, boolean checkJobTitle, boolean checkWorkplace, boolean checkDepartment);
	

}
