package nts.uk.ctx.sys.gateway.dom.login.password.identification;

import java.util.Optional;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.ToString;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.gateway.dom.login.IdentifiedEmployeeInfo;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataMngInfoImport;
import nts.uk.ctx.sys.shared.dom.user.User;

/**
 * 識別結果
 */
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class IdentificationResult {
	/** 識別成功 */
	private final boolean identificationSuccess;
	/** 識別された社員(識別成功時のみ) */
	private final Optional<IdentifiedEmployeeInfo> employeeInfo;
	/** 識別失敗記録の永続化処理 */
	private final Optional<AtomTask> failureLog;

	/**
	 * 識別成功
	 * @param EmployeeDataMngInfoImport
	 * @param User
	 * @return IdentificationResult
	 */
	public static IdentificationResult success(EmployeeDataMngInfoImport employee, User user) {
		return new IdentificationResult(
				true, 
				Optional.of(new IdentifiedEmployeeInfo(employee, user)), 
				Optional.empty());
	}
	
	/**
	 * 識別失敗
	 * @param AtomTask
	 * @return IdentificationResult
	 */
	public static IdentificationResult failure(AtomTask failureLog) {
		
		return new IdentificationResult(
				false, 
				Optional.empty(), 
				Optional.of(failureLog));
	}
	
	public boolean isSuccess() {
		return this.identificationSuccess;
	}

	public boolean isFailure() {
		return !this.isSuccess();
	}
	
	public IdentifiedEmployeeInfo getEmployeeInfo() {
		// 社員情報が取得できていない時（失敗時時）にはそもそもこのメソッドを呼ぶべきではないのでifPresentは行わない
		return employeeInfo.get();
	}
	
	public AtomTask getAtomTask() {
		AtomTask atomTasks = AtomTask.none();
		if(failureLog.isPresent()) {
			atomTasks = atomTasks.then(failureLog.get());
		}
		return atomTasks;
	}
}