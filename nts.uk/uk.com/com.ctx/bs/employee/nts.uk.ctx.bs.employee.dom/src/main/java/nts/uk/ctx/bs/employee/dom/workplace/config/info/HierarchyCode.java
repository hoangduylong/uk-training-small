/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.config.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.NUMERIC)
@StringMaxLength(30)
public class HierarchyCode extends StringPrimitiveValue<HierarchyCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new history id.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public HierarchyCode(String rawValue) {
		super(rawValue);
	}
}