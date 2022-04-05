package nts.uk.ctx.bs.employee.pub.employee.export;

import java.util.List;

import nts.uk.ctx.bs.employee.pub.employee.EmployeeBasicInfoExport;
import nts.uk.ctx.bs.employee.pub.employee.export.dto.PersonEmpBasicInfoDto;
//import nts.uk.ctx.bs.employee.pub.employee.export.dto.PersonEmployeeInfoDto;

public interface PersonEmpBasicInfoPub {

	List<EmployeeBasicInfoExport> getFromEmployeeIdList(List<String> employeeIds);
	
	/**
	 * RequestList No.61
	 * 
	 * @param employeeIds
	 * @return
	 * 社員ID(List)から個人社員基本情報を取得
	 */
	List<PersonEmpBasicInfoDto> getPerEmpBasicInfo(List<String> employeeIds);

	List<PersonEmpBasicInfoDto> getEmpBasicInfo(String companyId, List<String> employeeIds);

	//List<PersonEmployeeInfoDto> getEmployeesMatchingName(List<String> pid, String companyId);

	// Pub get all Sid
	List<String> getAllSidByCid(String cid);
}
