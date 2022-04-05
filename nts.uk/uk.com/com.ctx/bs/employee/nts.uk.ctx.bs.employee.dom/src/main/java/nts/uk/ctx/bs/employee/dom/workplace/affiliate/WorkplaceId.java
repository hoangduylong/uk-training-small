/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.affiliate;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class WorkplaceId.
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(36)
public class WorkplaceId extends StringPrimitiveValue<WorkplaceId> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new workplace id.
	 *
	 * @param rawValue the raw value
	 */
	public WorkplaceId(String rawValue) {
		super(rawValue);
	}

}
