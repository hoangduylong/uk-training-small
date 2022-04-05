package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock;

import java.util.Optional;

import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;

public interface AccountLockPolicyRepository {

	void update(AccountLockPolicy domain);
	
	Optional<AccountLockPolicy> getAccountLockPolicy(String tenantCode);
	
	Optional<AccountLockPolicy> getAccountLockPolicy(ContractCode contractCode);
}
