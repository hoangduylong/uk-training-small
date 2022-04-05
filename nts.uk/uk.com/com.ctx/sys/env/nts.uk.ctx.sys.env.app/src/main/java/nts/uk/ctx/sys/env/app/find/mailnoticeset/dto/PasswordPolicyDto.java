/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.find.mailnoticeset.dto;

import lombok.Getter;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.ComplexityImport;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicySetMemento;

/**
 * The Class PasswordPolicyDto.
 */
@Getter
public class PasswordPolicyDto implements PasswordPolicySetMemento {

	/** The is use. */
	private Boolean isUse;

	/** The complexity. */
	private ComplexityDto complexity;

	/** The lowest digits. */
	private Integer lowestDigits;

	/** The history count. */
	private Integer historyCount;

	/** The validity period. */
	private Integer validityPeriod;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicySetMemento#
	 * setContractCode(java.lang.String)
	 */
	@Override
	public void setContractCode(String contractCode) {
		// Do nothing
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicySetMemento#
	 * setIsUse(java.lang.Boolean)
	 */
	@Override
	public void setIsUse(Boolean isUse) {
		this.isUse = isUse;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicySetMemento#
	 * setLowestDigits(java.lang.Integer)
	 */
	@Override
	public void setLowestDigits(Integer lowestDigits) {
		this.lowestDigits = lowestDigits;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicySetMemento#
	 * setComplexity(nts.uk.ctx.sys.env.dom.mailnoticeset.dto.ComplexityImport)
	 */
	@Override
	public void setComplexity(ComplexityImport complexity) {
		ComplexityDto memento = new ComplexityDto();
		complexity.saveToMemento(memento);
		this.complexity = memento;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicySetMemento#
	 * setHistoryCount(java.lang.Integer)
	 */
	@Override
	public void setHistoryCount(Integer historyCount) {
		this.historyCount = historyCount;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PasswordPolicySetMemento#
	 * setValidityPeriod(java.lang.Integer)
	 */
	@Override
	public void setValidityPeriod(Integer validityPeriod) {
		this.validityPeriod = validityPeriod;
	}

}
