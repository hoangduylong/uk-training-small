package nts.uk.ctx.bs.employee.pubimp.temporaryabsence;


import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TimeoffLeaveRecordWithPeriod;
import nts.uk.ctx.bs.employee.pub.temporaryabsence.EmpLeavePeriodExport;
import nts.uk.ctx.bs.employee.pub.temporaryabsence.EmpLeaveWorkPeriodExport;
import nts.uk.ctx.bs.employee.pub.temporaryabsence.EmployeeLeaveHistoryPublish;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * @author HieuLt
 *
 */
@Stateless
public class EmployeeLeaveHistoryPublishImpl implements EmployeeLeaveHistoryPublish {
	
	@Inject
	public TempAbsHistRepository tempAbsHistRepository;
	
	@Override
	public List<EmpLeavePeriodExport> getBySpecifyingPeriod(List<String> lstEmpId, DatePeriod datePeriod) {
		//[1] 期間を指定して休職期間を取得する
		/*List<TempAbsenceHistory> data = require.getByListSid(lstEmpId, datePeriod);
		List<EmpLeavePeriodExport> result = new ArrayList<>();
		data.forEach(x -> {
			result.addAll(x.getDateHistoryItems().stream().map(c -> {
				return new EmpLeavePeriodExport(x.getEmployeeId(), c.span());
			}).collect(Collectors.toList()));
		});*/
		//$履歴項目リスト = require.期間付き休職履歴を取得する( 社員IDリスト, 期間 )
		Require require = new Require(tempAbsHistRepository);
		String companyId = AppContexts.user().companyId();
		List<TimeoffLeaveRecordWithPeriod> data =  require.getLeaveHistoryItemsWithPeriod(companyId, lstEmpId, datePeriod);
		List<EmpLeavePeriodExport> result = data.stream().map(c -> new EmpLeavePeriodExport(c.getTempAbsenceHisItem().getEmployeeId(), c.getDatePeriod())).collect(Collectors.toList());
		//return $履歴項目リスト: map 社員の休職期間( $.履歴項目.社員ID, $.期間 )													
		return result;
	}
	
	@Override
	public List<EmpLeaveWorkPeriodExport> getHolidayPeriod(List<String> lstEmpId, DatePeriod datePeriod) {
		//[2] 期間を指定して休業期間を取得する
		// $履歴項目リスト = require.期間付き休業履歴を取得する( 社員IDリスト, 期間 )
		Require require = new Require(tempAbsHistRepository);
		String companyId = AppContexts.user().companyId();
		List<TimeoffLeaveRecordWithPeriod> data = require.getByEmpIdsAndStandardDate(companyId, lstEmpId, datePeriod);
		List<EmpLeaveWorkPeriodExport> result = data
				.stream().map(c -> new EmpLeaveWorkPeriodExport(c.getTempAbsenceHisItem().getEmployeeId(),
						c.getDatePeriod(), c.getTempAbsenceHisItem().getTempAbsenceFrNo().v().intValue()))
				.collect(Collectors.toList());
		//return $履歴項目リスト: map 社員の休業期間( $.履歴項目.社員ID, $.期間, $.履歴項目.枠NO )	
		return result;
	}
    @AllArgsConstructor
	class Require {
		@Inject
		public TempAbsHistRepository tempAbsHistRepository;

		// [R-1] 期間付き休職履歴を取得する
		// 休職休業履歴Repository.期間付き休職履歴項目を取得する( 会社ID, List<社員ID>, 期間 )
		public List<TimeoffLeaveRecordWithPeriod> getLeaveHistoryItemsWithPeriod(String companyID,List<String> employeeIds, DatePeriod datePeriod) {
			List<TimeoffLeaveRecordWithPeriod> result = tempAbsHistRepository.getLeaveHistoryItemsWithPeriod(companyID, employeeIds, datePeriod);	
			return result;
		}

		// [R-2] 期間付き休業履歴を取得する
		// 休職休業履歴Repository.期間付き休業履歴項目を取得する( 会社ID, List<社員ID>, 期間 )
		public List<TimeoffLeaveRecordWithPeriod> getByEmpIdsAndStandardDate(String companyId, List<String> employeeIds,
				DatePeriod datePeriod) {
			List<TimeoffLeaveRecordWithPeriod> result = tempAbsHistRepository.getAbsenceHistoryItemPeriod(companyId,
					employeeIds, datePeriod);
			return result;
		}

	}
}
