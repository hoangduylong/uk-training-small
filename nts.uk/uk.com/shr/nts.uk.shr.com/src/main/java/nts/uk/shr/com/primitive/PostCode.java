/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.arc.primitive.constraint.StringRegEx;

/**
 * The Class PostCode.
 */
@StringRegEx("^\\d{7}$|(^\\d{3}[-]\\d{4}?$)|(^$)")
@StringMaxLength(8)
public class PostCode extends StringPrimitiveValue<PostCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new post code.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public PostCode(String rawValue) {
		super(rawValue);
	}

}
