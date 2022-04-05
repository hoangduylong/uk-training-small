package nts.uk.ctx.sys.auth.ac.securitypolicy;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.adapter.securitypolicy.PasswordPolicyAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.securitypolicy.PasswordPolicyImport;
import nts.uk.ctx.sys.gateway.pub.securitypolicy.PasswordPolicyDto;
import nts.uk.ctx.sys.gateway.pub.securitypolicy.PasswordPolicyPublisher;
@Stateless
public class PasswordPolicyAdapterImpl implements PasswordPolicyAdapter{

	@Inject
	private PasswordPolicyPublisher passwordPolicyPub;
	
	@Override
	public Optional<PasswordPolicyImport> getPasswordPolicy(String contractCode) {
		Optional<PasswordPolicyDto> passwordPolicyOpt  =	this.passwordPolicyPub.getPasswordPolicy( contractCode); 
		if(passwordPolicyOpt.isPresent()){
			return Optional.ofNullable(this.toImport(passwordPolicyOpt.get()));
		}
		return Optional.empty();
	}

	@Override
	public void updatePasswordPolicy(PasswordPolicyImport passwordPolicy) {
		this.passwordPolicyPub.updatePasswordPolicy(this.toDto(passwordPolicy));
		
	}
	
	private PasswordPolicyImport toImport(PasswordPolicyDto passwordPolicyDto){
		return new PasswordPolicyImport(passwordPolicyDto.getContractCode(), passwordPolicyDto.getNotificationPasswordChange(), passwordPolicyDto.isLoginCheck(), passwordPolicyDto.isInitialPasswordChange(), passwordPolicyDto.isUse(), passwordPolicyDto.getHistoryCount(), passwordPolicyDto.getLowestDigits(), passwordPolicyDto.getValidityPeriod(), passwordPolicyDto.getNumberOfDigits(), passwordPolicyDto.getSymbolCharacters(), passwordPolicyDto.getAlphabetDigit());
	}
	private PasswordPolicyDto	toDto(PasswordPolicyImport PasswordPolicyImport){
		return new PasswordPolicyDto(PasswordPolicyImport.getContractCode(), PasswordPolicyImport.getNotificationPasswordChange(), PasswordPolicyImport.isLoginCheck(), PasswordPolicyImport.isInitialPasswordChange(), PasswordPolicyImport.isUse(), PasswordPolicyImport.getHistoryCount(), PasswordPolicyImport.getLowestDigits(), PasswordPolicyImport.getValidityPeriod(), PasswordPolicyImport.getNumberOfDigits(), PasswordPolicyImport.getSymbolCharacters(), PasswordPolicyImport.getAlphabetDigit());
	}
}
