package nts.uk.ctx.sys.gateway.app.find.securitypolicy;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.gateway.app.find.securitypolicy.dto.AccountLockPolicyDto;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicyRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class AccountLockPolicyFinder {
	@Inject
	private AccountLockPolicyRepository accountLockPolicyRepository;
	

	public AccountLockPolicyDto getAccountLockPolicy() {
		String contractCode = AppContexts.user().contractCode();
		Optional<AccountLockPolicy> accountLockPolicyOptional = this.accountLockPolicyRepository
				.getAccountLockPolicy(new ContractCode(contractCode));
		if (accountLockPolicyOptional.isPresent()) {
			return this.toDto(accountLockPolicyOptional.get());
		} else {
			return null;
		}
	}

	private AccountLockPolicyDto toDto(AccountLockPolicy accountLockPolicy) {
		return new AccountLockPolicyDto(
				accountLockPolicy.getErrorCount().v().intValue(), accountLockPolicy.getLockInterval().v().intValue(),
				accountLockPolicy.getLockOutMessage().v(), accountLockPolicy.isUse());

	}

}
