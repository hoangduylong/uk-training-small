package nts.uk.ctx.sys.gateway.app.find.securitypolicy;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.gateway.app.find.securitypolicy.dto.PasswordPolicyDto;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicyRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class PasswordPolicyFinder {
	@Inject
	private PasswordPolicyRepository passwordPolicyRepository;

	public PasswordPolicyDto getPasswordPolicy() {

		return getPasswordPolicy(AppContexts.user().contractCode());
	}
	
	public PasswordPolicyDto getPasswordPolicy(String contractCode) {
		PasswordPolicy passwordPolicy = this.passwordPolicyRepository
				.getPasswordPolicy(new ContractCode(contractCode));
		
		return this.toDto(passwordPolicy);
	}

	private PasswordPolicyDto toDto(PasswordPolicy passwordPolicy) {
		return new PasswordPolicyDto(
				passwordPolicy.getNotificationPasswordChange().v().intValue(), passwordPolicy.isLoginCheck(),
				passwordPolicy.isInitialPasswordChange(), passwordPolicy.isUse(),
				passwordPolicy.getHistoryCount().v().intValue(), 
				passwordPolicy.getComplexityRequirement().getMinimumLength().v(),
				passwordPolicy.getValidityPeriod().v().intValue(), 
				passwordPolicy.getComplexityRequirement().getAlphabetDigits().v(),
				passwordPolicy.getComplexityRequirement().getNumeralDigits().v(),
				passwordPolicy.getComplexityRequirement().getSymbolDigits().v());
	}

}
