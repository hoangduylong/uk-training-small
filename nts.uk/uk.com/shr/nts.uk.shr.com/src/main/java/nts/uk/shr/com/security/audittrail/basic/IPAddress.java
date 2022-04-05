/******************************************************************
 * Copyright (c) 2020 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.security.audittrail.basic;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * @author thanhpv
 * @name IPアドレス
 */
@IntegerRange(min=0,max=255)
public class IPAddress extends IntegerPrimitiveValue<IPAddress> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * @param rawValue the raw value
	 */
	public IPAddress(int rawValue) {
		super(rawValue);
	}
}