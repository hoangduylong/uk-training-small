/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.singlesignon;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class UserName.
 * ユーザ名
 * Windowsユーザ名
 * 他システムユーザ名
 */
@StringMaxLength(256)
@StringCharType(CharType.ANY_HALF_WIDTH)
public class UserName extends StringPrimitiveValue<UserName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new user name.
	 *
	 * @param rawValue the raw value
	 */
	public UserName(String rawValue) {
		super(rawValue);
	}

}
