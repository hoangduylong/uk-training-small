package nts.uk.ctx.sys.gateway.dom.login.password.authenticate;

import java.util.Optional;

import lombok.val;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.gateway.dom.login.IdentifiedEmployeeInfo;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockoutData;

/**
 * パスワード認証に失敗した
 */
public class FailedPasswordAuthenticate {

	public static FailedAuthenticateTask failed(Require require, IdentifiedEmployeeInfo identifiedEmployee, String password) {
		val failuresLog = PasswordAuthenticationFailureLog.failedNow(identifiedEmployee.getEmployeeId(), password);
		return new FailedAuthenticateTask(
				Optional.of(AtomTask.of(() -> require.save(failuresLog))),
				
				require.getAccountLockPolicy(identifiedEmployee.getTenantCode())
							.flatMap(p -> p.lockIfViolated(require, identifiedEmployee.getUserId()))
							.flatMap(lockoutData -> Optional.of(
									AtomTask.of(() -> require.save(lockoutData))
							)));
	}

	public static interface Require extends AccountLockPolicy.Require{
		
		void save(PasswordAuthenticationFailureLog failuresLog);
		
		Optional<AccountLockPolicy> getAccountLockPolicy(String contractCode);
		
		void save(LockoutData lockOutData);
	}
}
