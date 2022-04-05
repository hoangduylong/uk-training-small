/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class PositionName.
 */
@StringMaxLength(20)
// 職位名称
public class JobTitleName extends StringPrimitiveValue<JobTitleName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new position name.
	 *
	 * @param rawValue the raw value
	 */
	public JobTitleName(String rawValue) {
		super(rawValue);
	}

}
