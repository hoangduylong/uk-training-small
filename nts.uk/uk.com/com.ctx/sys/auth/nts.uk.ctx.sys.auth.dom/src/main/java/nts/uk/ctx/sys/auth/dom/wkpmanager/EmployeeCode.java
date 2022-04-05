/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.wkpmanager;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class EmployeeCode.
 */
//社員CD
@StringMaxLength(12)
public class EmployeeCode extends StringPrimitiveValue<EmployeeCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new employee code.
	 *
	 * @param rawValue the raw value
	 */
	public EmployeeCode(String rawValue) {
		super(rawValue);
	}

}
