package nts.uk.ctx.bs.employee.pubimp.companyhistory;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.history.CompanyWithEmployeeID;
import nts.uk.ctx.bs.employee.pub.companyhistory.EmpComHisPub;
import nts.uk.ctx.bs.employee.pub.companyhistory.EmpEnrollPeriodExported;

/**
 * 社員の所属会社履歴Publish Impl
 * @author HieuLt
 *
 */

@Stateless
public class EmpComHisPubImpl implements EmpComHisPub {
	@Inject
	private  AffCompanyHistRepository repo;
	
	@Override
	public List<EmpEnrollPeriodExported> getEnrollmentPeriod(List<String> lstEmpId, DatePeriod datePeriod) {
		List<EmpEnrollPeriodExported> result = new ArrayList<>();
		Require require = new Require(repo);
		//$履歴リスト = require.期間を指定して社員ID付き履歴項目を取得する( 社員IDリスト, 期間 )																														
		List<CompanyWithEmployeeID> data =  require.getHistoryItemByEmpID(lstEmpId, datePeriod) ;
		data.forEach( x ->{
			if (x.getAffCompanyHistItem().isDestinationData()){
				EmpEnrollPeriodExported empEnrollPeriodAccep =  EmpEnrollPeriodExported.accepting(x.getEmpId(), x.getAffCompanyHistItem().getDatePeriod());
				result.add(empEnrollPeriodAccep);
			}
			else{
				EmpEnrollPeriodExported empEnrollPeriodSecond = EmpEnrollPeriodExported.seconded(x.getEmpId(), x.getAffCompanyHistItem().getDatePeriod());
				result.add(empEnrollPeriodSecond);
			}
		});

		return result;
	}
	@AllArgsConstructor
	class Require{
		
		@Inject
		private  AffCompanyHistRepository repo;
		
		/**
		 * [R-1] 期間を指定して社員ID付き履歴項目を取得する
		 * 所属会社履歴Repository.期間を指定して社員ID付き履歴項目を取得する( List<社員ID>, 期間 )																												
		 * @param lstEmpId
		 * @param datePeriod
		 * @return
		 */
		List<CompanyWithEmployeeID> getHistoryItemByEmpID(List<String> lstEmpId , DatePeriod datePeriod){
			List<CompanyWithEmployeeID> result = repo.getHistoryItemByEmpID(lstEmpId, datePeriod);
			return result;
		}

	}
}
