/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.dom.loginrecord;

import java.util.Optional;

/**
 * The Interface LoginRecordGetMemento.
 */
public interface LoginRecordGetMemento {
	
	/**
	 * Gets the operation id.
	 *
	 * @return the operation id
	 */
	public String getOperationId();
	
	/**
	 * Gets the login method.
	 *
	 * @return the login method
	 */
	public LoginMethod getLoginMethod();
	
	/**
	 * Gets the login status.
	 *
	 * @return the login status
	 */
	public LoginStatus getLoginStatus();
	
	/**
	 * Gets the lock status.
	 *
	 * @return the lock status
	 */
	public boolean getLockStatus();
	
	/**
	 * Gets the url.
	 *
	 * @return the url
	 */
	public Optional<String> getUrl();
	
	/**
	 * Gets the remarks.
	 *
	 * @return the remarks
	 */
	public Optional<String> getRemarks();

}
