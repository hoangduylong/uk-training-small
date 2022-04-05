package nts.uk.ctx.sys.gateway.dom.login.password.identification;

import java.util.Optional;

import lombok.val;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataMngInfoImport;
import nts.uk.ctx.sys.shared.dom.user.User;

/**
 * ログイン社員を識別する
 */
public class EmployeeIdentify {
	
	/**
	 * 社員コードにより識別する
	 * @param require
	 * @param companyId
	 * @param employeeCode
	 * @return
	 */
	public static IdentificationResult identifyByEmployeeCode(Require require, String companyId, String employeeCode) {
		val employee = require.getEmployeeDataMngInfoImportByEmployeeCode(companyId, employeeCode);
		// 社員コードから社員を特定できない
		if(!employee.isPresent()) {
			return identifyFailure(require, companyId, employeeCode);
		}
		val user = require.getUserByPersonId(employee.get().getPersonId());
		
		// 個人IDからユーザを特定できない
		if (!user.isPresent()) {
			return identifyFailure(require, companyId, employeeCode);
		}
		
		// 社員、ユーザの特定に成功
		return IdentificationResult.success(employee.get(), user.get());
	}
	
	// 識別に失敗
	private static IdentificationResult identifyFailure(Require require, String companyId, String employeeCode) {
		val failureLog = AtomTask.of(() -> {
			require.addFailureLog(PasswordAuthIdentificationFailureLog.create(companyId, employeeCode));
		});
		return IdentificationResult.failure(failureLog);
	}
	
	public static interface Require{
		Optional<EmployeeDataMngInfoImport> getEmployeeDataMngInfoImportByEmployeeCode(String companyId, String employeeCode);
		
		Optional<User> getUserByPersonId(String personId);
		
		void addFailureLog(PasswordAuthIdentificationFailureLog failurLog);
	}
}
