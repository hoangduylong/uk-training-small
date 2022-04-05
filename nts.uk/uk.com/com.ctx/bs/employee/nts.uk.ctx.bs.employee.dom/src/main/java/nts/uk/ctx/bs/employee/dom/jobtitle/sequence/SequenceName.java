/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.sequence;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class SequenceName.
 */
@StringMaxLength(20)
// 序列名称
public class SequenceName extends StringPrimitiveValue<SequenceName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new sequence name.
	 *
	 * @param rawValue the raw value
	 */
	public SequenceName(String rawValue) {
		super(rawValue);
	}

}
