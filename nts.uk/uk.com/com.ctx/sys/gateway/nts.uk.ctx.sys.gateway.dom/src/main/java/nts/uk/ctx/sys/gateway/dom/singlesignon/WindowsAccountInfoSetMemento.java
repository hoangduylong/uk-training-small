/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.singlesignon;

/**
 * The Interface WindowAccountSetMemento.
 */
public interface WindowsAccountInfoSetMemento {

	/**
	 * Sets the hot name.
	 *
	 * @param hotName the new hot name
	 */
	void setHostName(HostName hostName);

	/**
	 * Sets the user name.
	 *
	 * @param userName the new user name
	 */
	void setUserName(UserName userName);

	/**
	 * Sets the no.
	 *
	 * @param no the new no
	 */
	void setNo(Integer no);

	/**
	 * Sets the use division.
	 *
	 * @param useDivision the new use division
	 */
	void setUseAtr(UseAtr useAtr);

}
