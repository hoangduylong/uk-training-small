/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employment;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class EmploymentName.
 */
// 雇用名称
@StringMaxLength(20)
public class EmploymentName extends StringPrimitiveValue<EmploymentName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -1325727366520482013L;

	/**
	 * Instantiates a new employment name.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public EmploymentName(String rawValue) {
		super(rawValue);
	}

}
