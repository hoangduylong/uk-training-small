/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.primitive;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.arc.primitive.constraint.StringRegEx;

/**
 * The Class DepartmentCode.
 */
@StringMaxLength(value = 10)
@StringRegEx("^[a-zA-Z0-9_\\-]{1,10}$")
public class DepartmentCode extends CodePrimitiveValue<DepartmentCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new department code.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public DepartmentCode(String rawValue) {
		super(rawValue);
	}

}
