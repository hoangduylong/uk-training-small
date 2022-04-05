/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.role;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;
import nts.uk.shr.com.primitive.ZeroPaddedCode;

/**
 * The Class RoleCode.
 */
@StringMaxLength(4)
@StringCharType(CharType.ALPHA_NUMERIC)
@ZeroPaddedCode
public class RoleCode extends CodePrimitiveValue<RoleCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new role code.
	 *
	 * @param rawValue the raw value
	 */
	public RoleCode(String rawValue) {
		super(rawValue);
	}

}
