/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.order;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class EmployeeOrderName.
 */
// 社員並び順名称
@StringMaxLength(20)
public class EmployeeOrderName extends StringPrimitiveValue<EmployeeOrderName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new employee order name.
	 *
	 * @param rawValue the raw value
	 */
	public EmployeeOrderName(String rawValue) {
		super(rawValue);
	}

}
