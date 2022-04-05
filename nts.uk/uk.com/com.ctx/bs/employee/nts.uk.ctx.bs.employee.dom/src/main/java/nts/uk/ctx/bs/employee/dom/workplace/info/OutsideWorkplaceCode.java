/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class OutsideWorkplaceCode.
 */
@StringMaxLength(20)
public class OutsideWorkplaceCode extends StringPrimitiveValue<OutsideWorkplaceCode> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new outside workplace code.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public OutsideWorkplaceCode(String rawValue) {
		super(rawValue);
	}

}
