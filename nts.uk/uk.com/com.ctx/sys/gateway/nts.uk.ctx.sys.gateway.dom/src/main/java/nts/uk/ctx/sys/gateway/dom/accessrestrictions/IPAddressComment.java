/******************************************************************
 * Copyright (c) 2020 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * @author thanhpv
 * @name IPアドレスの備考
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.GateWay.アクセス制限.IPアドレスの備考
 */

@StringMaxLength(40)
public class IPAddressComment extends StringPrimitiveValue<IPAddressComment> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * @param rawValue the raw value
	 */
	public IPAddressComment(String rawValue) {
		super(rawValue);
	}
}