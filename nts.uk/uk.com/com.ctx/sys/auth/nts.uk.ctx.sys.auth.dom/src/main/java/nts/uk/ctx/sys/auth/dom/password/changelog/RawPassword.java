/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.password.changelog;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class RawPassword.
 */
@StringMaxLength(30)
@StringCharType(CharType.ANY_HALF_WIDTH)
public class RawPassword extends StringPrimitiveValue<RawPassword> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new hash password.
	 *
	 * @param rawValue the raw value
	 */
	public RawPassword(String rawValue) {
		super(rawValue);
	}
}
