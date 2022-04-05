package nts.uk.ctx.sys.portal.ac.notice;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.pub.employee.EmployeeInfoExport;
import nts.uk.ctx.bs.employee.pub.employee.SyEmployeePub;
import nts.uk.ctx.bs.employee.pub.workplace.SWkpHistExport;
import nts.uk.ctx.bs.employee.pub.workplace.master.WorkplaceInforExport;
import nts.uk.ctx.bs.employee.pub.workplace.master.WorkplacePub;
import nts.uk.ctx.bs.person.pub.anniversary.AnniversaryNoticeExport;
import nts.uk.ctx.bs.person.pub.anniversary.AnniversaryNoticePub;
import nts.uk.ctx.sys.auth.pub.role.RoleExport;
import nts.uk.ctx.sys.auth.pub.role.RoleExportRepo;
import nts.uk.ctx.sys.portal.dom.notice.adapter.AnniversaryNoticeImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.EmployeeInfoImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.MessageNoticeAdapter;
import nts.uk.ctx.sys.portal.dom.notice.adapter.RoleImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.WorkplaceInfoImport;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class MessageNoticeAdapterImpl implements MessageNoticeAdapter {
	
	@Inject
	private WorkplacePub workplacePub;
	
	@Inject
	private SyEmployeePub syEmployeePub;
	
	@Inject
	private AnniversaryNoticePub anniversaryNoticePub;
	
	@Inject
	private RoleExportRepo roleExportRepo;

	@Override
	public Optional<String> getWpId(String sid, GeneralDate baseDate) {
		// 1. call：[RQ30]社員所属職場履歴を取得
		Optional<SWkpHistExport> sWkpHistExport = workplacePub.findBySidNew("", sid, baseDate);
		if (!sWkpHistExport.isPresent()) {
			return Optional.empty();
		}
		// OUTPUT: 社員所属職場履歴を取得
		return Optional.of(sWkpHistExport.get().getWorkplaceId());
	}

	@Override
	public List<EmployeeInfoImport> getByListSID(List<String> sIds) {
		List<EmployeeInfoExport> data = this.syEmployeePub.getByListSid(sIds);
		if (data.isEmpty()) {
			return new ArrayList<EmployeeInfoImport>();
		}
		return data.stream()
				.map(x -> EmployeeInfoImport
							.builder()
							.sid(x.getSid())
							.scd(x.getScd())
							.bussinessName(x.getBussinessName())
							.build())
				.collect(Collectors.toList());
	}

	@Override
	public Map<AnniversaryNoticeImport, Boolean> setFlag(DatePeriod datePeriod) {
		Map<AnniversaryNoticeExport, Boolean> dataExport = anniversaryNoticePub.setFlag(datePeriod);
		Map<AnniversaryNoticeImport, Boolean> result = new LinkedHashMap<AnniversaryNoticeImport, Boolean>();
		if (dataExport.isEmpty()) {
			return result;
		}
		dataExport.forEach((key, value) -> {
			result.put(tranferData(key), value);
		});
		
		return result;
	}
	
	/**
	 * Transfer from AnniversaryNoticeExport to AnniversaryNoticeImport
	 * @param exportData AnniversaryNoticeExport
	 * @return
	 */
	public AnniversaryNoticeImport tranferData(AnniversaryNoticeExport exportData) {
		return AnniversaryNoticeImport.builder().personalId(exportData.getPersonalId())
				.noticeDay(exportData.getNoticeDay()).seenDate(exportData.getSeenDate())
				.anniversary(String.join("", String.valueOf(exportData.getAnniversary().getMonthValue()),
						String.valueOf(exportData.getAnniversary().getDayOfMonth())))
				.anniversaryTitle(exportData.getAnniversaryTitle())
				.notificationMessage(exportData.getNotificationMessage())
				.displayDate(String.join("-", String.valueOf(exportData.getAnniversary().getMonthValue()),
						String.valueOf(exportData.getAnniversary().getDayOfMonth())))
				.build();
	}

	@Override
	public Optional<RoleImport> findByRoleId(String roleId) {
		Optional<RoleExport> role = roleExportRepo.findByRoleId(roleId);
		if (!role.isPresent()) {
			return Optional.empty();
		}
		return Optional.of(RoleImport.builder()
				.companyId(role.get().getCompanyId())
				.roleId(role.get().getRoleId())
				.roleCode(role.get().getRoleCode())
				.roleName(role.get().getRoleName())
				.assignAtr(role.get().getAssignAtr())
				.employeeReferenceRange(role.get().getEmployeeReferenceRange())
				.build());
		
	}

	@Override
	public List<WorkplaceInfoImport> getWorkplaceMapCodeBaseDateName(String companyId, List<String> wpkIds) {
		GeneralDate baseDate = GeneralDate.today();
		List<WorkplaceInforExport> dataExport = workplacePub.getWorkplaceInforByWkpIds(companyId, wpkIds, baseDate);
		if (dataExport.isEmpty()) {
			return new ArrayList<WorkplaceInfoImport>();
		}

		return dataExport.stream().map(mapper -> WorkplaceInfoImport.builder()
				.workplaceId(mapper.getWorkplaceId())
				.workplaceCode(mapper.getWorkplaceCode())
				.workplaceName(mapper.getWorkplaceName())
				.build())
				.collect(Collectors.toList());
	}

	@Override
	public Optional<WorkplaceInfoImport> getWorkplaceInfo(String sid, GeneralDate baseDate) {
		// 1. call：[RQ30]社員所属職場履歴を取得
		Optional<SWkpHistExport> sWkpHistExport = workplacePub.findBySidNew("", sid, baseDate);
		if (!sWkpHistExport.isPresent()) {
			return Optional.empty();
		}
		SWkpHistExport wkp = sWkpHistExport.get();
		return Optional.of(WorkplaceInfoImport.builder()
				.workplaceId(wkp.getWorkplaceId())
				.workplaceCode(wkp.getWorkplaceCode())
				.workplaceName(wkp.getWorkplaceName())
				.build());
	}

	@Override
	public boolean isTodayHaveNewAnniversary() {
		//新記念日があるか
		return this.anniversaryNoticePub.isTodayHaveNewAnniversary();
	}
}
