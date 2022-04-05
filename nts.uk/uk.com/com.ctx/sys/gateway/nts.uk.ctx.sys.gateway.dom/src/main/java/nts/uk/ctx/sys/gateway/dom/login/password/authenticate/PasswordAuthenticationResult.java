package nts.uk.ctx.sys.gateway.dom.login.password.authenticate;

import java.util.Optional;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.ToString;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.validate.ValidationResultOnLogin;

/**
 * パスワード認証結果
 */
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class PasswordAuthenticationResult {

	/** 認証成功 */
	private final boolean success;
	
	/** パスワードポリシーの検証結果（認証成功時のみ） */
	private final Optional<ValidationResultOnLogin> passwordValidation;

	/** 認証失敗記録の永続化処理*/
	private final Optional<AtomTask> failureLog;
	
	/** ロックアウトデータの永続化処理*/
	private final Optional<AtomTask> lockoutData;
	
	/**
	 * 認証成功
	 * @param passwordValidation
	 * @return
	 */
	public static PasswordAuthenticationResult success(
			ValidationResultOnLogin passwordValidation) {
		
		return new PasswordAuthenticationResult(
				true,
				Optional.of(passwordValidation),
				Optional.of(AtomTask.none()),
				Optional.of(AtomTask.none()));
	}
	
	/**
	 * 認証失敗
	 * @param atomTask
	 * @return
	 */
	public static PasswordAuthenticationResult failure(FailedAuthenticateTask atomTask) {
		return new PasswordAuthenticationResult(
				false,
				Optional.empty(),
				atomTask.getFailedAuthenticate(),
				atomTask.getLockoutData());
	}
	
	public boolean isSuccess() {
		return this.success;
	}

	public boolean isFailure() {
		return !this.isSuccess();
	}
	
	public ValidationResultOnLogin getPasswordValidation() {
		// パスワードポリシーの検証結果が無い時（認証失敗時）にはそもそもこのメソッドを呼ぶべきではないのでifPresentは行わない
		return this.passwordValidation.get();
	}
	
	// AtomTaskが複数あるため直接ではなく合算させてから返す
	public AtomTask getAtomTask() {
		AtomTask atomTasks = AtomTask.none();
		if(failureLog.isPresent()) {
			atomTasks = atomTasks.then(failureLog.get());
		}
		if(lockoutData.isPresent()) {
			atomTasks = atomTasks.then(lockoutData.get());
		}
		return atomTasks;
	}
}
