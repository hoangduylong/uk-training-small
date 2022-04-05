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
// 年
@IntegerRange(min = 1, max = 9999)
public class Year extends IntegerPrimitiveValue<Year>
		implements DiscreteValue<Year> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new year.
	 *
	 * @param rawValue the raw value
	 */
	public Year(Integer rawValue) {
		super(rawValue);
	}

	/* (non-Javadoc)
	 * @see nts.gul.util.value.DiscreteValue#nextValue(boolean)
	 */
	@Override
	public Year nextValue(boolean isIncrement) {
		return new Year(this.v() + (isIncrement ? 1 : -1));
	}

}
