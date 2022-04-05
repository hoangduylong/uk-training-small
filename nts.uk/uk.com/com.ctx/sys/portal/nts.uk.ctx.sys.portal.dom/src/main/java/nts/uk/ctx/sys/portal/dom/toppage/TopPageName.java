/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.toppage;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class TopPageName.
 */
@StringMaxLength(30)
public class TopPageName extends StringPrimitiveValue<TopPageName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new top page name.
	 *
	 * @param rawValue the raw value
	 */
	public TopPageName(String rawValue) {
		super(rawValue);
	}
}
