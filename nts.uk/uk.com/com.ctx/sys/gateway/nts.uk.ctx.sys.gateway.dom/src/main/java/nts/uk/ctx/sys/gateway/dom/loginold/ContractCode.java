/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class ContractCode.
 */
@StringCharType(CharType.NUMERIC)
@StringMaxLength(12)
public class ContractCode extends StringPrimitiveValue<ContractCode> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new contract code.
	 *
	 * @param rawValue the raw value
	 */
	public ContractCode(String rawValue) {
		super(rawValue);
	}
}