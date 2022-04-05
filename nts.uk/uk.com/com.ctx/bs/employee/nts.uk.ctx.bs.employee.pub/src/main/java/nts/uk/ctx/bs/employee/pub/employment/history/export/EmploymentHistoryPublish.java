package nts.uk.ctx.bs.employee.pub.employment.history.export;

import java.util.List;

import nts.arc.time.calendar.period.DatePeriod;


/**
 * 社員の雇用履歴Publish
 * UKDesign.ドメインモデル."NittsuSystem.UniversalK".基幹.社員.雇用.雇用履歴.Export
 * @author HieuLt
 *
 */
public interface EmploymentHistoryPublish {
	/**
	 * [1] 期間を指定して雇用期間を取得する
	 * @param lstEmpID
	 * @param datePeriod
	 * @return
	 */
	List<EmploymentPeriodExported> get(List<String> lstEmpID , DatePeriod datePeriod);
	
}
