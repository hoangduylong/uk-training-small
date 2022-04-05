/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.shared.dom.user.ContractCode;

/**
 * The Interface LogoutDataSetMemento.
 */
public interface LockOutDataSetMemento {
	
	/**
	 * Sets the user id.
	 *
	 * @param userId the new user id
	 */
	public void setUserId(String userId);

	/**
	 * Sets the logout date time.
	 *
	 * @param logoutDateTime the new logout date time
	 */
	public void setLogoutDateTime(GeneralDateTime logoutDateTime);

	/**
	 * Sets the log type.
	 *
	 * @param logType the new log type
	 */
	public void setLogType(LockType logType);

	/**
	 * Sets the contract code.
	 *
	 * @param contractCode the new contract code
	 */
	public void setContractCode(ContractCode contractCode);

	/**
	 * Sets the login method.
	 *
	 * @param loginMethod the new login method
	 */
	public void setLoginMethod(LoginMethod loginMethod);
}
