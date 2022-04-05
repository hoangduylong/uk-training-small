package nts.uk.ctx.bs.employee.pub.spr;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpInDesignSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpInfoSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpJobHistSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.EmpSprExport;
import nts.uk.ctx.bs.employee.pub.spr.export.PersonInfoSprExport;

/**
 * 
 * @author Doan Duy Hung
 *
 */
public interface EmployeeSprPub {
	
	public void validateEmpCodeSpr(String employeeCD);
	
	public Optional<EmpSprExport> getEmployeeID(String companyID, String employeeCD);
	
	public Optional<EmpJobHistSprExport> findBySid(String employeeID, GeneralDate baseDate);
	
	public List<EmpInfoSprExport> getEmployeesAtWorkByBaseDate(String companyId, GeneralDate baseDate);
	
	public List<EmpInDesignSprExport> getEmpInDesignated(String workplaceId, 
			GeneralDate referenceDate, List<Integer> empStatus);
	
	public PersonInfoSprExport getPersonInfo(String sID);
	
	public List<String> findListWorkplaceIdByCidAndWkpIdAndBaseDate(String companyId, String workplaceId, GeneralDate baseDate);
	
}
