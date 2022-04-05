/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.primitive;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.arc.primitive.constraint.StringRegEx;

/**
 * The Class WorkplaceCode.
 */
@StringMaxLength(value = 10)
@StringRegEx("^[a-zA-Z0-9_-]{1,10}$")
public class WorkplaceCode extends CodePrimitiveValue<WorkplaceCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new workplace code.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public WorkplaceCode(String rawValue) {
		super(rawValue);
	}

}
