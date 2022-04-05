/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employment;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

/**
 * The Class EmpExternalCode.
 */
// 雇用外部コード
//@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(10)
//@ZeroPaddedCode
public class EmpExternalCode extends CodePrimitiveValue<EmpExternalCode> {

	/**
	 * Instantiates a new emp external code.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public EmpExternalCode(String rawValue) {
		super(rawValue);
	}

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

}
