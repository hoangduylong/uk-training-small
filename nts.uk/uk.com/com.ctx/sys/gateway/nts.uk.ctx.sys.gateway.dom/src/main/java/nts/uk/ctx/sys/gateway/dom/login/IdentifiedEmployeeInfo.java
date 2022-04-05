package nts.uk.ctx.sys.gateway.dom.login;

import lombok.Value;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataMngInfoImport;
import nts.uk.ctx.sys.shared.dom.user.User;

/**
 * 識別された社員
 */
@Value
public class IdentifiedEmployeeInfo {

	/** 社員 */
	EmployeeDataMngInfoImport employee;
	
	/* ユーザ */
	User user;
	
	public String getTenantCode() {
		return user.getContractCode().v();
	}
	
	public String getUserId() {
		return user.getUserID();
	}
	
	public String getCompanyId() {
		return employee.getCompanyId();
	}
	
	public String getEmployeeId() {
		return employee.getEmployeeId();
	}
}