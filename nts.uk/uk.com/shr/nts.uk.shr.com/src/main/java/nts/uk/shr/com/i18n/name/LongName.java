/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.i18n.name;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class LongName.
 */
// 長い呼称
@StringMaxLength(12)
public class LongName extends StringPrimitiveValue<LongName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new long name.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public LongName(String rawValue) {
		super(rawValue);
	}

}
