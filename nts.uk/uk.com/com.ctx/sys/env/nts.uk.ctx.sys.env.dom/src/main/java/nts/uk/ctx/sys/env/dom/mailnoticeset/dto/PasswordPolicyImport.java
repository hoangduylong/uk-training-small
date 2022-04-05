/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

import lombok.Getter;

/**
 * The Class PasswordPolicyImport.
 */
//パスワードポリシー
@Getter
public class PasswordPolicyImport {

	/** The contract code. */
	private String contractCode;

	/** The is use. */
	private Boolean isUse;

	/** The lowest digits. */
	private Integer lowestDigits;

	/** The complexity. */
	private ComplexityImport complexity;

	/** The history count. */
	private Integer historyCount;

	/** The validity period. */
	private Integer validityPeriod;

	/**
	 * Instantiates a new password policy import.
	 *
	 * @param isUse
	 *            the is use
	 * @param lowestDigits
	 *            the lowest digits
	 * @param complexity
	 *            the complexity
	 * @param historyCount
	 *            the history count
	 * @param validityPeriod
	 *            the validity period
	 */
	public PasswordPolicyImport(Boolean isUse, Integer lowestDigits, ComplexityImport complexity, Integer historyCount,
			Integer validityPeriod) {
		this.isUse = isUse;
		this.lowestDigits = lowestDigits;
		this.complexity = complexity;
		this.historyCount = historyCount;
		this.validityPeriod = validityPeriod;
	}

	/**
	 * Instantiates a new password policy import.
	 *
	 * @param memento
	 *            the memento
	 */
	public PasswordPolicyImport(PasswordPolicyGetMemento memento) {
		this.contractCode = memento.getContractCode();
		this.isUse = memento.getIsUse();
		this.lowestDigits = memento.getLowestDigits();
		this.complexity = memento.getComplexity();
		this.historyCount = memento.getHistoryCount();
		this.validityPeriod = memento.getValidityPeriod();
	}

	/**
	 * Save to memento.
	 *
	 * @param memento
	 *            the memento
	 */
	public void saveToMemento(PasswordPolicySetMemento memento) {
		memento.setContractCode(this.contractCode);
		memento.setIsUse(this.isUse);
		memento.setLowestDigits(this.lowestDigits);
		memento.setComplexity(this.complexity);
		memento.setHistoryCount(this.historyCount);
		memento.setValidityPeriod(this.validityPeriod);
	}

}
