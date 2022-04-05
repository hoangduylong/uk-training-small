package nts.uk.ctx.bs.employee.pub.companyhistory;

import java.util.List;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * 社員の所属会社履歴Publish
 * @author HieuLt
 *
 */
public interface EmpComHisPub {
	//[1] 期間を指定して在籍期間を取得する
	List<EmpEnrollPeriodExported> getEnrollmentPeriod (List<String> lstEmpId , DatePeriod datePeriod);

}
