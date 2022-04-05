package nts.uk.ctx.bs.employee.pub.employee.employeeInfo.setting.code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmployeeCodeEditSettingExport {
	private String companyId;
	
	private int ceMethodAtr;
	
	private int digitNumb;
}
