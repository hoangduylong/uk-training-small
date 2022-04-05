/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.temporaryabsence.frame;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class TempAbsenceFrameName.
 */
//休職休業枠名称
@StringMaxLength(12)
public class TempAbsenceFrameName extends StringPrimitiveValue<TempAbsenceFrameName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 3072948248326997648L;

	/**
	 * Instantiates a new temp absence frame name.
	 *
	 * @param rawValue the raw value
	 */
	public TempAbsenceFrameName(String rawValue) {
		super(rawValue);
	}
	
}
