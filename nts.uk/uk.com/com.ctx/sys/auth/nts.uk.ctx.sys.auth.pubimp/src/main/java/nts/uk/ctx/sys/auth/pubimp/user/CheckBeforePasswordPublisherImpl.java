/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pubimp.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.security.hash.password.PasswordHash;
import nts.uk.ctx.sys.auth.dom.adapter.securitypolicy.PasswordPolicyAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.securitypolicy.PasswordPolicyImport;
import nts.uk.ctx.sys.auth.dom.password.changelog.PasswordChangeLog;
import nts.uk.ctx.sys.auth.dom.password.changelog.PasswordChangeLogRepository;
import nts.uk.ctx.sys.auth.pub.user.CheckBeforeChangePassOutput;
import nts.uk.ctx.sys.auth.pub.user.CheckBeforePasswordPublisher;
import nts.uk.ctx.sys.auth.pub.user.PasswordMessageObject;
import nts.uk.ctx.sys.auth.pub.user.PasswordSplitObject;
import nts.uk.ctx.sys.shared.dom.user.User;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;

/**
 * The Class CheckBeforePasswordPublisherImpl.
 */
@Stateless
public class CheckBeforePasswordPublisherImpl implements CheckBeforePasswordPublisher {
	
	/** The password policy adap. */
	@Inject
	private PasswordPolicyAdapter passwordPolicyAdap;
	
	@Override
	public CheckBeforeChangePassOutput passwordPolicyCheckForSubmit(String userId, String newPass, String contractCode) {
		//get PasswordPolicy
		PasswordPolicyImport passwordPolicyImport = this.passwordPolicyAdap.getPasswordPolicy(contractCode).get();
		
		List<PasswordMessageObject> messages = new ArrayList<>();
		PasswordPolicyCountChar countChar = this.getCountChar(newPass);
		
		PasswordSplitObject passSplit = new PasswordSplitObject();
		passSplit.setLengthPass(newPass.length());
		passSplit.setNumberOfDigits(countChar.getNumberOfDigits());
		passSplit.setAlphabetDigit(countChar.getAlphabetDigit());
		passSplit.setSymbolCharacters(countChar.getSymbolCharacters());
		
		if (passwordPolicyImport.isUse) {
			//check PassPolicy
			messages = this.checkPolicyChar(passwordPolicyImport, passSplit);
		}
		if (messages.isEmpty()) {
			return new CheckBeforeChangePassOutput(false, messages);
		} else {
			return new CheckBeforeChangePassOutput(true, messages);
		}
	}
	
	private List<PasswordMessageObject> checkPolicyChar(PasswordPolicyImport passwordPolicyImport, PasswordSplitObject passSplit){
		//List message
		List<PasswordMessageObject> messages = new ArrayList<>();
		
		//check passpolicy
		if (passSplit.getLengthPass() < passwordPolicyImport.getLowestDigits()) {
			messages.add(new PasswordMessageObject("Msg_1186",passwordPolicyImport.getLowestDigits()));
		}
		if (passSplit.getAlphabetDigit() < passwordPolicyImport.getAlphabetDigit()) {
			messages.add(new PasswordMessageObject("Msg_1188", passwordPolicyImport.getAlphabetDigit()));
		}
		if (passSplit.getNumberOfDigits() < passwordPolicyImport.getNumberOfDigits()) {
			messages.add(new PasswordMessageObject("Msg_1189", passwordPolicyImport.getNumberOfDigits()));
		}
		if (passSplit.getSymbolCharacters() < passwordPolicyImport.getSymbolCharacters()) {
			messages.add( new PasswordMessageObject("Msg_1190", passwordPolicyImport.getSymbolCharacters()));
		}
		//return 
		return messages;
	}
	
	/**
	 * Gets the count char.
	 *
	 * @param newPass
	 *            the new pass
	 * @return the count char
	 */
	private PasswordPolicyCountChar getCountChar(String newPass) {
		
		int countAlphabet = 0;
		int countDigits = 0;
		int countSymbol = 0;
		for (int i = 0; i < newPass.length(); i++) {
			if (Character.isLetter(newPass.charAt(i))) {
				countAlphabet++;
				continue;
			}
			if (Character.isDigit(newPass.charAt(i))) {
				countDigits++;
				continue;
			}
			countSymbol++;
		}
		return new PasswordPolicyCountChar(countDigits, countSymbol, countAlphabet);
	}
}
