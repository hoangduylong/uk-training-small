/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.toppage;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.ZeroPaddedCode;

/**
 * The Class TopPageCode.
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(4)
@ZeroPaddedCode
public class TopPageCode extends StringPrimitiveValue<TopPageCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new top page code.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public TopPageCode(String rawValue) {
		super(rawValue);
	}
}
