/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.i18n.name;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class IntermediateDesignation.
 */
// 中間の呼称
@StringMaxLength(8)
public class IntermediateDesignation extends StringPrimitiveValue<IntermediateDesignation> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new intermediate designation.
	 *
	 * @param rawValue the raw value
	 */
	public IntermediateDesignation(String rawValue) {
		super(rawValue);
	}

}
