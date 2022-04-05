/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.find.mailnoticeset.dto;

import lombok.Getter;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.ComplexitySetMemento;

/**
 * The Class ComplexityDto.
 */
@Getter
public class ComplexityDto implements ComplexitySetMemento {

	/** The alphabet digit. */
	private Integer alphabetDigit;

	/** The number of digits. */
	private Integer numberOfDigits;

	/** The number of char. */
	private Integer numberOfChar;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.ComplexitySetMemento#
	 * setAlphabetDigit(java.lang.Integer)
	 */
	@Override
	public void setAlphabetDigit(Integer alphabetDigit) {
		this.alphabetDigit = alphabetDigit;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.ComplexitySetMemento#
	 * setNumberOfDigits(java.lang.Integer)
	 */
	@Override
	public void setNumberOfDigits(Integer numberOfDigits) {
		this.numberOfDigits = numberOfDigits;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.ComplexitySetMemento#
	 * setNumberOfChar(java.lang.Integer)
	 */
	@Override
	public void setNumberOfChar(Integer numberOfChar) {
		this.numberOfChar = numberOfChar;
	}

}
