/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

/**
 * The Interface PasswordPolicyGetMemento.
 */
public interface PasswordPolicyGetMemento {

	/**
	 * Gets the contract code.
	 *
	 * @return the contract code
	 */
	public String getContractCode();

	/**
	 * Gets the checks if is use.
	 *
	 * @return the checks if is use
	 */
	public Boolean getIsUse();

	/**
	 * Gets the lowest digits.
	 *
	 * @return the lowest digits
	 */
	public Integer getLowestDigits();

	/**
	 * Gets the complexity.
	 *
	 * @return the complexity
	 */
	public ComplexityImport getComplexity();

	/**
	 * Gets the history count.
	 *
	 * @return the history count
	 */
	public Integer getHistoryCount();

	/**
	 * Gets the validity period.
	 *
	 * @return the validity period
	 */
	public Integer getValidityPeriod();

}
