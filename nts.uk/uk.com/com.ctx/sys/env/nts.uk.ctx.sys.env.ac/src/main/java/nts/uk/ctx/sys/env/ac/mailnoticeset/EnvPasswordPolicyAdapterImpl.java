/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.ac.mailnoticeset;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.env.dom.mailnoticeset.adapter.EnvPasswordPolicyAdapter;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.ComplexityImport;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicyImport;
import nts.uk.ctx.sys.gateway.pub.securitypolicy.PasswordPolicyPublisher;

/**
 * The Class PasswordPolicyAdapterImpl.
 */
@Stateless
public class EnvPasswordPolicyAdapterImpl implements EnvPasswordPolicyAdapter {

	/** The password policy publisher. */
	@Inject
	private PasswordPolicyPublisher passwordPolicyPublisher;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.adapter.PasswordPolicyAdapter#
	 * getPasswordPolicy(java.lang.String)
	 */
	@Override
	public Optional<PasswordPolicyImport> getPasswordPolicy(String contractCode) {
		return this.passwordPolicyPublisher.getPasswordPolicy(contractCode)
				.map(item -> {
						ComplexityImport complexityImport = new ComplexityImport(item.getAlphabetDigit(), item.getNumberOfDigits(),
								item.getSymbolCharacters());
						return new PasswordPolicyImport(item.isUse(), item.getLowestDigits(), complexityImport,
								item.getHistoryCount(), item.getValidityPeriod());
				});
	}

}
