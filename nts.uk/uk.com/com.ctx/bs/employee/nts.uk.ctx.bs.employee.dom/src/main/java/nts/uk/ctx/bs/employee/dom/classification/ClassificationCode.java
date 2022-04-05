/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.classification;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;
import nts.uk.shr.com.primitive.ZeroPaddedCode;


/**
 * The Class ClassificationCode.
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(10)
@ZeroPaddedCode
public class ClassificationCode extends CodePrimitiveValue<ClassificationCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new classification code.
	 *
	 * @param rawValue the raw value
	 */
	public ClassificationCode(String rawValue) {
		super(rawValue);
	}

}
