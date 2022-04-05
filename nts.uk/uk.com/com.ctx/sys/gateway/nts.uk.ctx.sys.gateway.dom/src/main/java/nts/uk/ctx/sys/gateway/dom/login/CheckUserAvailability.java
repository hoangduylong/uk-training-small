package nts.uk.ctx.sys.gateway.dom.login;

import java.util.Optional;

import nts.arc.error.BusinessException;
import nts.arc.error.RawErrorMessage;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;

/**
 *ログインできるユーザかチェックする 
 */
public class CheckUserAvailability {

	public static void check(Require require, IdentifiedEmployeeInfo identified) {
		
		// ユーザの有効期限が切れていないかチェック
		if(!identified.getUser().isAvailableAt(GeneralDate.today())) {
			throw new BusinessException("Msg_316");
		}
		
		// アカウントロック
		String tenantCode = identified.getTenantCode();
		String userId = identified.getUserId();
		require.getAccountLockPolicy(tenantCode)
				.ifPresent(policy -> {
					if (policy.isLocked(require, userId)) {
						throw new BusinessException(new RawErrorMessage(policy.getLockOutMessage().v()));
					}
				});
	}
	
	public static interface Require extends 
			AccountLockPolicy.Require {
		Optional<AccountLockPolicy> getAccountLockPolicy(String tenantCode);
	}
}
