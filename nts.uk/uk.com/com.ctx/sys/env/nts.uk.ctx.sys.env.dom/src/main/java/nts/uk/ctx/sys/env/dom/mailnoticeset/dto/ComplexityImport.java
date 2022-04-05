/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

import lombok.Getter;

/**
 * The Class ComplexityImport.
 */
//複雑さ
@Getter
public class ComplexityImport {

	/** The alphabet digit. */
	private Integer alphabetDigit;

	/** The number of digits. */
	private Integer numberOfDigits;

	/** The number of char. */
	private Integer numberOfChar;

	/**
	 * Instantiates a new complexity import.
	 *
	 * @param alphabetDigit
	 *            the alphabet digit
	 * @param numberOfDigits
	 *            the number of digits
	 * @param numberOfChar
	 *            the number of char
	 */
	public ComplexityImport(Integer alphabetDigit, Integer numberOfDigits, Integer numberOfChar) {
		this.alphabetDigit = alphabetDigit;
		this.numberOfDigits = numberOfDigits;
		this.numberOfChar = numberOfChar;
	}

	/**
	 * Instantiates a new person contact import.
	 *
	 * @param memento
	 *            the memento
	 */
	public ComplexityImport(ComplexityGetMemento memento) {
		this.alphabetDigit = memento.getAlphabetDigit();
		this.numberOfDigits = memento.getNumberOfDigits();
		this.numberOfChar = memento.getNumberOfChar();
	}

	/**
	 * Save to memento.
	 *
	 * @param memento
	 *            the memento
	 */
	public void saveToMemento(ComplexitySetMemento memento) {
		memento.setAlphabetDigit(this.alphabetDigit);
		memento.setNumberOfDigits(this.numberOfDigits);
		memento.setNumberOfChar(this.numberOfChar);
	}
	
}
