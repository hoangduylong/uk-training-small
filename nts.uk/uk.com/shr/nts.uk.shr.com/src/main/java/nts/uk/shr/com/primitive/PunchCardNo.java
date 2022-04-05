/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.primitive;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.arc.primitive.constraint.StringRegEx;

/**
 * The Class PunchCardNo.
 */
@StringMaxLength(20)
@StringRegEx("^[a-zA-Z0-9\"#\\$%&\\(~\\|\\{\\}\\[\\]@:`\\*\\+\\?;\\/_\\-><\\)]{1,20}$")
public class PunchCardNo extends CodePrimitiveValue<PunchCardNo> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new punch card no.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public PunchCardNo(String rawValue) {
		super(rawValue);
	}

}
