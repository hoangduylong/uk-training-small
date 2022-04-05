package nts.uk.ctx.bs.employee.pub.employee.employeeInfo.setting.code;

import java.util.Optional;

public interface IEmployeeCESettingPub {

	/*
	 * method for request list[020]
	 * return one reccord of EmployeeCodeSetting dto:
	 * companyId, ceMethodAtr [code editing method], digitNumb [number of digit]
	 */
	Optional<EmployeeCodeEditSettingExport> getByComId(String companyId);
}
