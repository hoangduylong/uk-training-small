/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.role;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class RoleName.
 */
@StringMaxLength(30)
public class RoleName extends StringPrimitiveValue<RoleName>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new role name.
	 *
	 * @param rawValue the raw value
	 */
	public RoleName(String rawValue) {
		super(rawValue);
	}

}
