/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

/**
 * The Interface PasswordPolicySetMemento.
 */
public interface PasswordPolicySetMemento {

	/**
	 * Sets the contract code.
	 *
	 * @param contractCode the new contract code
	 */
	public void setContractCode(String contractCode);

	/**
	 * Sets the checks if is use.
	 *
	 * @param isUse the new checks if is use
	 */
	public void setIsUse(Boolean isUse);

	/**
	 * Sets the lowest digits.
	 *
	 * @param lowestDigits the new lowest digits
	 */
	public void setLowestDigits(Integer lowestDigits);

	/**
	 * Sets the complexity.
	 *
	 * @param complexity the new complexity
	 */
	public void setComplexity(ComplexityImport complexity);

	/**
	 * Sets the history count.
	 *
	 * @param historyCount the new history count
	 */
	public void setHistoryCount(Integer historyCount);

	/**
	 * Sets the validity period.
	 *
	 * @param validityPeriod the new validity period
	 */
	public void setValidityPeriod(Integer validityPeriod);

}
