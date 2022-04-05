/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.singlesignon;

/**
 * The Interface WindowAccountGetMemento.
 */
public interface WindowsAccountInfoGetMemento {
	
	/**
	 * Gets the hot name.
	 *
	 * @return the hot name
	 */
	HostName getHostName();
	
	
	/**
	 * Gets the user name.
	 *
	 * @return the user name
	 */
	UserName getUserName();
	
	/**
	 * Gets the no.
	 *
	 * @return the no
	 */
	Integer getNo();
	
	
	/**
	 * Gets the use atr.
	 *
	 * @return the use atr
	 */
	UseAtr getUseAtr();
	
	
	
}
