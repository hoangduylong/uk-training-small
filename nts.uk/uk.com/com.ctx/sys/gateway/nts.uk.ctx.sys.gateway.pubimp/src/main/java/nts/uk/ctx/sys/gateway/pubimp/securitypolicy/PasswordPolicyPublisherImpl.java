package nts.uk.ctx.sys.gateway.pubimp.securitypolicy;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicyRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.complexity.PasswordComplexityRequirement;
import nts.uk.ctx.sys.gateway.pub.securitypolicy.PasswordPolicyDto;
import nts.uk.ctx.sys.gateway.pub.securitypolicy.PasswordPolicyPublisher;
@Stateless
public class PasswordPolicyPublisherImpl implements PasswordPolicyPublisher{
	@Inject
	private PasswordPolicyRepository PasswordPolicyRepo;
	@Override
	public Optional<PasswordPolicyDto> getPasswordPolicy(String contractCode) {
		PasswordPolicy passwordPolicy = this.PasswordPolicyRepo.getPasswordPolicy(new ContractCode(contractCode));
		return Optional.ofNullable(new PasswordPolicyDto(
				contractCode,
				passwordPolicy.getNotificationPasswordChange().v().signum(),
				passwordPolicy.isLoginCheck(),
				passwordPolicy.isInitialPasswordChange(),
				passwordPolicy.isUse(),
				passwordPolicy.getHistoryCount().v().intValue(),
				passwordPolicy.getComplexityRequirement().getMinimumLength().v(),
				passwordPolicy.getValidityPeriod().v().intValue(),
				passwordPolicy.getComplexityRequirement().getNumeralDigits().v(),
				passwordPolicy.getComplexityRequirement().getSymbolDigits().v(),
				passwordPolicy.getComplexityRequirement().getAlphabetDigits().v())); 
	}

	@Override
	public void updatePasswordPolicy(PasswordPolicyDto passwordPolicy) {
		this.PasswordPolicyRepo.updatePasswordPolicy(this.toDomain(passwordPolicy));
	}
	
	private PasswordPolicy toDomain(PasswordPolicyDto passwordPolicy) {
		
		val complexity = PasswordComplexityRequirement.createFromJavaType(
				passwordPolicy.lowestDigits, passwordPolicy.numberOfDigits, passwordPolicy.symbolCharacters,
				passwordPolicy.alphabetDigit);
		
		return PasswordPolicy.createFromJavaType(passwordPolicy.getContractCode(),
				passwordPolicy.getNotificationPasswordChange(),
				passwordPolicy.isLoginCheck(),
				passwordPolicy.initialPasswordChange,
				passwordPolicy.isUse, passwordPolicy.historyCount,
				passwordPolicy.validityPeriod, complexity);
	}

}
