package nts.uk.ctx.sys.gateway.dom.tenantlogin;

import java.util.Optional;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.ToString;
import nts.arc.error.BusinessException;
import nts.arc.task.tran.AtomTask;

/**
 * テナント認証結果
 * @author hiroki_katou
 *
 */
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class TenantAuthenticationResult {
	/** テナント認証成功 */
	private final boolean success;
	
	/** エラーメッセージID(認証失敗時のみ) */
	private final Optional<String> errorMessageID;
	
	/** テナント認証失敗記録の永続化処理 */
	private final Optional<AtomTask> failureLog;
	
	/**
	 * テナント認証に成功
	 * @return
	 */
	public static TenantAuthenticationResult success() {
		return new TenantAuthenticationResult(true, Optional.empty(), Optional.empty());
	}
	
	/**
	 * テナントの特定に失敗
	 * @param data.failureLog
	 * @return
	 */
	public static TenantAuthenticationResult failedToIdentifyTenant(AtomTask atomTask) {
		return new TenantAuthenticationResult(false, Optional.of("Msg_314"), Optional.of(atomTask));
	}
	
	/**
	 * テナントのパスワード検証に失敗
	 * @param data.failureLog
	 * @return
	 */
	public static TenantAuthenticationResult failedDueToIncorrectPassword(AtomTask atomTask) {
		return new TenantAuthenticationResult(false, Optional.of("Msg_302"), Optional.of(atomTask));
	}
	
	/**
	 * テナントの有効期限切れ
	 * @param data.failureLog
	 * @return
	 */
	public static TenantAuthenticationResult failedDueToExpiration(AtomTask atomTask) {
		return new TenantAuthenticationResult(false, Optional.of("Msg_315"), Optional.of(atomTask));
	}
	
	public boolean isSuccess() {
		return this.success;
	}
	
	public boolean isFailure() {
		return !this.isSuccess();
	}
	
	/**
	 * エラーメッセージを取得する
	 * @return
	 */
	public String getErrorMessageID() {
		// メッセージが無い時（成功時）にはそもそもこのメソッドを呼ぶべきではないのでifPresentは行わない
		return this.errorMessageID.get();
	}
	
	public AtomTask getAtomTask() {
		AtomTask atomTasks = AtomTask.none();
		if(failureLog.isPresent()) {
			atomTasks = atomTasks.then(failureLog.get());
		}
		return atomTasks;
	}
	
	/**
	 * エラーをスローする
	 */
	public void throwBusinessException() {
		if(this.errorMessageID.isPresent()) {
			throw new BusinessException(errorMessageID.get());
		}
	}
}