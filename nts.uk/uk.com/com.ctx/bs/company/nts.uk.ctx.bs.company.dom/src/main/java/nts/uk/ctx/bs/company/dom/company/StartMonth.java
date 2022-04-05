/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.dom.company;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * The Class StartMonth.
 */
@IntegerRange(min = 1, max = 12)
public class StartMonth extends IntegerPrimitiveValue<StartMonth>{
	/**serialVersionUID*/
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new term begin month.
	 *
	 * @param rawValue the raw value
	 */
	public StartMonth(int rawValue) {
		super(rawValue);
	}



}
