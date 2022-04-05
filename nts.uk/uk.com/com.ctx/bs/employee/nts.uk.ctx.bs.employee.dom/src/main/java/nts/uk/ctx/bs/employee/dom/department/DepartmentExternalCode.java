/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class DepartmentName.
 */
@StringMaxLength(15)
@StringCharType(CharType.ALPHA_NUMERIC)
// 部門名称
public class DepartmentExternalCode extends StringPrimitiveValue<DepartmentExternalCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new department name.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public DepartmentExternalCode(String rawValue) {
		super(rawValue);
	}

}
