/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.time.calendar;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * The Class Day.
 */
// 日
@IntegerRange(min = 1, max = 31)
public class Day extends IntegerPrimitiveValue<Day> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new day.
	 *
	 * @param rawValue the raw value
	 */
	public Day(Integer rawValue) {
		super(rawValue);
	}

}
