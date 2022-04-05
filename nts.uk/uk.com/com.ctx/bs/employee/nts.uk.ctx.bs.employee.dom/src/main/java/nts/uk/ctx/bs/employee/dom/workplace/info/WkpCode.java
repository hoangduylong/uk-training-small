/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.info;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

/**
 * The Class WkpCode.
 */
// 職場コード
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(10)
public class WkpCode extends CodePrimitiveValue<WkpCode>{

	

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new workplace code.
	 *
	 * @param rawValue the raw value
	 */

	public WkpCode(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}
}
