package nts.uk.ctx.bs.employee.pubimp.spr;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employeeinfo.EmployeeCode;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoPub;
import nts.uk.ctx.bs.employee.pub.employee.employeeindesignated.EmpInDesignatedPub;
import nts.uk.ctx.bs.employee.pub.jobtitle.SyJobTitlePub;
import nts.uk.ctx.bs.employee.pub.person.IPersonInfoPub;
import nts.uk.ctx.bs.employee.pub.person.PersonInfoExport;
import nts.uk.ctx.bs.employee.pub.spr.EmployeeSprPub;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpInDesignSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpInfoSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpJobHistSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.PersonInfoSprExport;
import nts.uk.ctx.bs.employee.pub.workplace.master.WorkplacePub;

/**
 * 
 * @author Doan Duy Hung
 *
 */
@Stateless
public class EmployeeSprPubImpl implements EmployeeSprPub {
	
	@Inject
	private EmployeeInfoPub employeeInfoPub;
	
	@Inject
	private SyJobTitlePub syJobTitlePub;
	
	@Inject
	private EmpInDesignatedPub empInDesignatedPub;
	
	@Inject
	private IPersonInfoPub personInfoPub;
	
//	@Inject
//	private SyWorkplacePub syWorkplacePub;
	
	@Inject
	private WorkplacePub workplacePub;

	@Override
	public void validateEmpCodeSpr(String employeeCD) {
		try {
			new EmployeeCode(employeeCD);
		} catch (Exception e) {
			throw new BusinessException("Msg_999", employeeCD);
		}
	}

	@Override
	public Optional<EmpSprExport> getEmployeeID(String companyID, String employeeCD) {
		return employeeInfoPub.getEmployeeInfo(companyID, employeeCD)
				.map(x -> new EmpSprExport(
						companyID, 
						employeeCD, 
						x.getEmployeeId(), 
						x.getPersonId(), 
						x.getPerName()));
	}

	@Override
	public Optional<EmpJobHistSprExport> findBySid(String employeeID, GeneralDate baseDate) {
		return syJobTitlePub.findBySid(employeeID, baseDate)
				.map(x -> new EmpJobHistSprExport(
						employeeID, 
						x.getJobTitleID(), 
						x.getJobTitleName(), 
						x.getStartDate(), 
						x.getEndDate()));
	}

	@Override
	public List<EmpInfoSprExport> getEmployeesAtWorkByBaseDate(String companyId, GeneralDate baseDate) {
		return employeeInfoPub.getEmployeesAtWorkByBaseDate(companyId, baseDate)
		.stream().map(x -> new EmpInfoSprExport(
				companyId, 
				x.getEmployeeCode(), 
				x.getEmployeeId(), 
				x.getPersonId(), 
				x.getPerName()))
		.collect(Collectors.toList());
	}

	@Override
	public List<EmpInDesignSprExport> getEmpInDesignated(String workplaceId, GeneralDate referenceDate,
			List<Integer> empStatus) {
		return empInDesignatedPub.getEmpInDesignated(workplaceId, referenceDate, empStatus)
				.stream().map(x -> new EmpInDesignSprExport(
						x.getEmployeeId(), 
						x.getStatusOfEmp()))
				.collect(Collectors.toList());
	}

	@Override
	public PersonInfoSprExport getPersonInfo(String sID) {
		PersonInfoExport rersonInfoExport = personInfoPub.getPersonInfo(sID);
		return new PersonInfoSprExport(
				rersonInfoExport.getPid(), 
				rersonInfoExport.getBusinessName(), 
				rersonInfoExport.getEntryDate(), 
				rersonInfoExport.getGender(), 
				rersonInfoExport.getBirthDay(), 
				rersonInfoExport.getEmployeeId(), 
				rersonInfoExport.getEmployeeCode(), 
				rersonInfoExport.getRetiredDate());
	}

	@Override
	public List<String> findListWorkplaceIdByCidAndWkpIdAndBaseDate(String companyId, String workplaceId, GeneralDate baseDate){
		return workplacePub.getAllChildrenOfWorkplaceId(companyId, baseDate, workplaceId);
	}

}
