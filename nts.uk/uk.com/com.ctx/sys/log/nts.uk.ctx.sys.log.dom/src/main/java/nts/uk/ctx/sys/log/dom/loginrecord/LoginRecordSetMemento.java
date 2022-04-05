/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.dom.loginrecord;

import java.util.Optional;

/**
 * The Interface LoginRecordSetMemento.
 */
public interface LoginRecordSetMemento {
	
	/**
	 * Sets the operation id.
	 *
	 * @param operationId the new operation id
	 */
	public void setOperationId(String operationId);
	
	/**
	 * Sets the login method.
	 *
	 * @param loginMethod the new login method
	 */
	public void setLoginMethod(LoginMethod loginMethod);
	
	/**
	 * Sets the login status.
	 *
	 * @param loginStatus the new login status
	 */
	public void setLoginStatus(LoginStatus loginStatus);
	
	/**
	 * Sets the lock status.
	 *
	 * @param lockStatus the new lock status
	 */
	public void setLockStatus(Integer lockStatus);
	
	/**
	 * Sets the url.
	 *
	 * @param url the new url
	 */
	public void setUrl(Optional<String> url);
	
	/**
	 * Sets the remarks.
	 *
	 * @param remarks the new remarks
	 */
	public void setRemarks(Optional<String> remarks);

}
