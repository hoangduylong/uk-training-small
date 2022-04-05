/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.shared.dom.user.ContractCode;

/**
 * The Interface LogoutDataGetMemento.
 */
public interface LockOutDataGetMemento {
	
	/**
	 * Gets the user id.
	 *
	 * @return the user id
	 */
	public String getUserId();

    /**
     * Gets the logout date time.
     *
     * @return the logout date time
     */
    public GeneralDateTime getLockOutDateTime();

    /**
     * Gets the log type.
     *
     * @return the log type
     */
    public LockType getLogType();

    /**
     * Gets the contract code.
     *
     * @return the contract code
     */
    public ContractCode getContractCode();

    /**
     * Gets the login method.
     *
     * @return the login method
     */
    public LoginMethod getLoginMethod();
}
