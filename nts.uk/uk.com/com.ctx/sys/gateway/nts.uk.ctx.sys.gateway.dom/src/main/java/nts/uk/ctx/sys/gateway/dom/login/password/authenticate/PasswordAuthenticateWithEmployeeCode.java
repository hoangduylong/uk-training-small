package nts.uk.ctx.sys.gateway.dom.login.password.authenticate;

import java.util.Optional;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.error.RawErrorMessage;
import nts.uk.ctx.sys.gateway.dom.login.IdentifiedEmployeeInfo;
import nts.uk.ctx.sys.gateway.dom.login.password.identification.EmployeeIdentify;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUser;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;

/**
 * 社員コードとパスワードで認証する
 */
public class PasswordAuthenticateWithEmployeeCode {
	
	public static PasswordAuthenticationResult authenticate(
			Require require,
			IdentifiedEmployeeInfo identified,
			String password) {
		
		// ロックアウトされている社員は認証させてはいけない
		checkLockout(require, identified);
		
		// パスワード認証
		val userPasswordOpt = require.getLoginPasswordOfUser(identified.getUserId());
		if (!userPasswordOpt.map(p -> p.matches(password)).orElse(true)) {
			val atomTask = FailedPasswordAuthenticate.failed(require, identified, password);
			return PasswordAuthenticationResult.failure(atomTask);
		}
		
		val userPassword = userPasswordOpt.get();
		
		// パスワードポリシーへの準拠チェック
		val passwordPolicy = require.getPasswordPolicy(identified.getTenantCode());
		val passwordPolicyResult = passwordPolicy.violatedOnLogin(userPassword, password);
		
		return PasswordAuthenticationResult.success(passwordPolicyResult);
	}
	
	/**
	 *ロックされているかチェックする 
	 */
	private static void checkLockout(Require require, IdentifiedEmployeeInfo identified) {
		require.getAccountLockPolicy(identified.getTenantCode())
				.ifPresent(policy -> {
					if (policy.isLocked(require, identified.getUserId())) {
						throw new BusinessException(new RawErrorMessage(policy.getLockOutMessage().v()));
					}
				});
	}
	
	public static interface Require extends
			FailedPasswordAuthenticate.Require,
			EmployeeIdentify.Require{
		
		Optional<LoginPasswordOfUser> getLoginPasswordOfUser(String userId);
		
		Optional<AccountLockPolicy> getAccountLockPolicy(String tenantCode);
		
		PasswordPolicy getPasswordPolicy(String tenantCode);
	}
}
