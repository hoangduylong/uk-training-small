/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.time.calendar;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;
import nts.gul.util.value.DiscreteValue;

/**
 * The Class Year.
 */
// 月
@IntegerRange(min = 1, max = 12)
public class Month extends IntegerPrimitiveValue<Month>
		implements DiscreteValue<Month> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new year.
	 *
	 * @param rawValue the raw value
	 */
	public Month(Integer rawValue) {
		super(rawValue);
	}

	/* (non-Javadoc)
	 * @see nts.gul.util.value.DiscreteValue#nextValue(boolean)
	 */
	@Override
	public Month nextValue(boolean isIncrement) {
		return new Month(this.v() + (isIncrement ? 1 : -1));
	}

}
