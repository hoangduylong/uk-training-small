/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

/**
 * The Class DepartmentCode.
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(10)
// 部門コード
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
