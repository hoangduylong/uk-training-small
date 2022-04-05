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
 * The Class LoginId.
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(12)
public class LoginId extends StringPrimitiveValue<LoginId> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new login id.
	 *
	 * @param rawValue the raw value
	 */
	public LoginId(String rawValue) {
		super(rawValue);
	}
}