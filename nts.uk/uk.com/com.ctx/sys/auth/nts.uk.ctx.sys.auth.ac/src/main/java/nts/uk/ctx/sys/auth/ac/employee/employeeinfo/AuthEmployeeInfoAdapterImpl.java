package nts.uk.ctx.sys.auth.ac.employee.employeeinfo;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmpInfoByCidSidPub;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoDtoExport;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoPub;
import nts.uk.ctx.bs.employee.pub.jobtitle.EmployeeJobHistExport;
import nts.uk.ctx.bs.employee.pub.jobtitle.SyJobTitlePub;
import nts.uk.ctx.bs.employee.pub.workplace.SWkpHistExport;
import nts.uk.ctx.bs.employee.pub.workplace.master.WorkplacePub;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.*;
import nts.uk.ctx.sys.auth.pub.role.RoleExportRepo;
import nts.uk.ctx.sys.auth.pub.role.RoleWhetherLoginPubExport;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Stateless
public class AuthEmployeeInfoAdapterImpl implements EmployeeInfoAdapter {

	@Inject
	private EmployeeInfoPub employeeInfoPub;

	@Inject
	private EmpInfoByCidSidPub empInfoByCidSidPub;

	@Inject
	private WorkplacePub workPlacePub;

	@Inject
	private SyJobTitlePub syJobTitlePub;

	@Inject
	private RoleExportRepo roleExportRepo;

	@Override
	public List<EmployeeInfoImport> getEmployeesAtWorkByBaseDate(String companyId, GeneralDate baseDate) {
		val listEmployeeInfoExport = employeeInfoPub.getEmployeesAtWorkByBaseDate(companyId, baseDate);

		List<EmployeeInfoImport> result = new ArrayList<EmployeeInfoImport>();
		for (EmployeeInfoDtoExport exportData : listEmployeeInfoExport) {
			result.add(new EmployeeInfoImport(exportData.getCompanyId(), exportData.getEmployeeCode(), exportData.getEmployeeId(), exportData.getPerName(), exportData.getPersonId()));
		}

		return result;
	}

	@Override
	public Optional<EmpInfoByCidSidImport> getEmpInfoBySidCid(String pid, String cid) {
		val exportData = empInfoByCidSidPub.getEmpInfoBySidCid(pid, cid);
		if (exportData == null)
			return Optional.empty();

		EmpInfoByCidSidImport result = new EmpInfoByCidSidImport(exportData.getSid(), exportData.getPersonName(), exportData.getPid(), exportData.getCid(), exportData.getScd());
		return Optional.of(result);
	}

	@Override
	public Optional<EmpInfoImport> getByComnyIDAndEmployeeCD(String companyID, String employeeCD) {
		val exportData = employeeInfoPub.getEmployeeInfo(companyID, employeeCD);
		if (!exportData.isPresent())
			return Optional.empty();
		else {
			EmpInfoImport result = new EmpInfoImport(exportData.get().getCompanyId(), exportData.get().getEmployeeCode(), exportData.get().getEmployeeId(), exportData.get().getPersonId(), exportData.get().getPerName());
			return Optional.of(result);
		}
	}

	@Override
	public EmployeeInformationImport findEmployeeInformation(String employeeId, GeneralDate baseDate) {

		EmployeeJobHistExport employeeJobHistExport = syJobTitlePub.findBySid(employeeId, baseDate).orElse(null);
		SWkpHistExport sWkpHistExport = workPlacePub.findBySid(employeeId, baseDate).orElse(null);
		RoleWhetherLoginPubExport roleWhetherLoginPubExport = roleExportRepo.getWhetherLoginerCharge();
		
		String positionName =employeeJobHistExport == null ? null : employeeJobHistExport.getJobTitleName();
		String wkpDisplayName = sWkpHistExport == null ? null : sWkpHistExport.getWkpDisplayName();
		boolean permision = false;
		if(roleWhetherLoginPubExport.isEmployeeCharge() || roleWhetherLoginPubExport.isSalaryProfessional() || roleWhetherLoginPubExport.isHumanResOfficer()){
			permision = true;
		}
		return new EmployeeInformationImport(employeeId, permision, positionName, wkpDisplayName);
	}
}
