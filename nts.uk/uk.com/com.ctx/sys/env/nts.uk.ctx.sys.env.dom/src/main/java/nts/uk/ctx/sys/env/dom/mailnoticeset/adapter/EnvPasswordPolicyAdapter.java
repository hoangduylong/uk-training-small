/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.adapter;

import java.util.Optional;

import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicyImport;

/**
 * The Interface PasswordPolicyAdapter.
 */
public interface EnvPasswordPolicyAdapter {

	/**
	 * Gets the password policy.
	 *
	 * @param contractCode the contract code
	 * @return the password policy
	 */
	Optional<PasswordPolicyImport> getPasswordPolicy(String contractCode);

}
