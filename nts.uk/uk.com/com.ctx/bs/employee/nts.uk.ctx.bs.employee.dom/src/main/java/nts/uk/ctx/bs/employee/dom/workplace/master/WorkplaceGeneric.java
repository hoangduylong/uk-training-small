/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.master;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class WorkplaceGenericName.
 */
@StringMaxLength(120)
public class WorkplaceGeneric extends StringPrimitiveValue<WorkplaceGeneric> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new workplace generic name.
	 *
	 * @param rawValue the raw value
	 */
	public WorkplaceGeneric(String rawValue) {
		super(rawValue);
	}
}
