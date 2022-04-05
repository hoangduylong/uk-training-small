package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import lombok.Getter;
import lombok.val;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockoutData;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LoginMethod;
import nts.uk.ctx.sys.shared.dom.user.ContractCode;

/**
 * アカウントロックポリシー
 */
@Getter
public class AccountLockPolicy extends AggregateRoot {
	
	// 契約コード
	private final ContractCode contractCode;
	
	// 利用する
	private boolean isUse;
	
	// エラー回数
	private ErrorCount errorCount;
	
	// エラー間隔
	private LockInterval lockInterval;
	
	// ロックアウトメッセージ
	private LockOutMessage lockOutMessage;

	public AccountLockPolicy(ContractCode contractCode, ErrorCount errorCount, LockInterval lockInterval,
			LockOutMessage lockOutMessage, boolean isUse) {
		super();
		this.contractCode = contractCode;
		this.errorCount = errorCount;
		this.lockInterval = lockInterval;
		this.lockOutMessage = lockOutMessage;
		this.isUse = isUse;
	}

	public static AccountLockPolicy createFromJavaType(String contractCode, int errorCount, int lockInterval,
			String lockOutMessage, boolean isUse) {
		return new AccountLockPolicy(new ContractCode(contractCode), new ErrorCount(new BigDecimal(errorCount)),
				new LockInterval(lockInterval), new LockOutMessage(lockOutMessage), isUse);
	}
	
	/**
	 * ロックされているか
	 * @param require
	 * @param userId
	 * @return
	 */
	public boolean isLocked(Require require, String userId) {
		return isUse && require.getLockOutData(userId).isPresent();
	}
	
	/**
	 * ポリシーに違反していたらロックする
	 * @param require
	 * @param userId
	 * @return
	 */
	public Optional<LockoutData> lockIfViolated(Require require, String userId) {
		
		if(this.isUse) {
			// 前回の失敗までしかまだ永続化されていないため、今回失敗分の１回を加算する
			int failCount = countFailure(require, userId) + 1;
			if(failCount >= errorCount.v().intValue()) {
				return Optional.of(LockoutData.autoLock(contractCode, userId, LoginMethod.NORMAL_LOGIN));
			}
		}
		return Optional.empty();
	}
		
	/**
	 * 過去の認証失敗回数を取得する
	 * @param require
	 * @param userId
	 * @return
	 */
	private int countFailure(Require require, String userId) {
		if(lockInterval.v() != 0) {
			val startDateTime = GeneralDateTime.now().addMinutes(-lockInterval.valueAsMinutes());
			return require.getFailureLog(userId, startDateTime, GeneralDateTime.now()).size();
		}
		return require.getFailureLog(userId).size();
	}
	
	public static interface Require {
		
		Optional<LockoutData> getLockOutData(String userId);
		
		List<PasswordAuthenticationFailureLog> getFailureLog(String userId);
		
		List<PasswordAuthenticationFailureLog> getFailureLog(String userId, GeneralDateTime start, GeneralDateTime end);
	}
}
