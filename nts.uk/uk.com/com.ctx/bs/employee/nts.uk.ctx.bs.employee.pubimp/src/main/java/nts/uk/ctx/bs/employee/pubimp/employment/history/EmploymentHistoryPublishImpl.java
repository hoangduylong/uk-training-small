package nts.uk.ctx.bs.employee.pubimp.employment.history;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryTerm;
import nts.uk.ctx.bs.employee.pub.employment.history.export.EmploymentHistoryPublish;
import nts.uk.ctx.bs.employee.pub.employment.history.export.EmploymentPeriodExported;
import nts.uk.shr.com.context.AppContexts;

/**
 * 社員の雇用履歴Publish Impl
 * @author HieuLt
 *
 */
@Stateless
public class EmploymentHistoryPublishImpl implements EmploymentHistoryPublish{
	
	@Inject
	public EmploymentHistoryRepository repo;
	
	@Override
	public List<EmploymentPeriodExported> get(List<String> lstEmpID, DatePeriod datePeriod) {
		Require require = new Require(repo);
		String companyId = AppContexts.user().companyId();
		List<EmploymentHistoryTerm> data = require.getEmploymentHistoryTerm(companyId, lstEmpID, datePeriod);
		List<EmploymentPeriodExported> result  = data.stream().map(c -> new EmploymentPeriodExported(
				c.getEmploymentHistoryItem().getEmployeeId(),
				c.getDatePeriod(),
				c.getEmploymentHistoryItem().getEmploymentCode().v(),
			Optional.ofNullable(c.getEmploymentHistoryItem().getSalarySegment() == null ? null : c.getEmploymentHistoryItem().getSalarySegment().value))).collect(Collectors.toList());
		
		return result;
	}
	@AllArgsConstructor
	class Require {
		@Inject
		public EmploymentHistoryRepository repo;
		/**
		 * [R-1] 期間付き履歴項目を取得する
		 * 雇用履歴Repository.期間付き履歴項目を取得する( 会社ID, List<社員ID>, 期間 )																													
		 * @param companyId
		 * @param lstEmpId
		 * @param datePeriod
		 * @return
		 */
		public List<EmploymentHistoryTerm> getEmploymentHistoryTerm(String companyId , List<String> lstEmpId , DatePeriod datePeriod ){
			List<EmploymentHistoryTerm> result = repo.getEmploymentHistoryTerm(companyId, lstEmpId, datePeriod);
			return result;	
		}
	}
}
