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
 * The Class HostName.
 * ホスト名
 * Windowsホスト名
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(256)
public class HostName extends StringPrimitiveValue<HostName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new host name.
	 *
	 * @param rawValue the raw value
	 */
	public HostName(String rawValue) {
		super(rawValue);
	}

}