/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

/**
 * The Interface PersonContactSetMemento.
 */
public interface PersonContactSetMemento {

	/**
	 * Sets the person id.
	 *
	 * @param personId the new person id
	 */
	public void setPersonId(String personId);

	/**
	 * Sets the mail address.
	 *
	 * @param mailAddress the new mail address
	 */
	public void setMailAddress(String mailAddress);

	/**
	 * Sets the mobile mail address.
	 *
	 * @param mobileMailAddress the new mobile mail address
	 */
	public void setMobileMailAddress(String mobileMailAddress);

	/**
	 * Sets the cell phone no.
	 *
	 * @param cellPhoneNo the new cell phone no
	 */
	public void setCellPhoneNo(String cellPhoneNo);

}
