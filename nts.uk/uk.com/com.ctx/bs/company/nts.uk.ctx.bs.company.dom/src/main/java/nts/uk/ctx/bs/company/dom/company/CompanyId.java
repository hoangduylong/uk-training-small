/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.dom.company;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;
/**
 * 会社ID
 * The Class CompanyId.
 */
@StringMaxLength(17)
public class CompanyId extends CodePrimitiveValue<CompanyId>{
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new company id.
	 * @param rawValue the raw value
	 */
	public CompanyId(String rawValue) {
		super(rawValue);
	}

}
