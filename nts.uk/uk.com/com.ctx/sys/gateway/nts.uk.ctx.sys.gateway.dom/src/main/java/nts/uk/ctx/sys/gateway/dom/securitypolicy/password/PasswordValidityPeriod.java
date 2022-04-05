package nts.uk.ctx.sys.gateway.dom.securitypolicy.password;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMaxValue;
import nts.arc.primitive.constraint.DecimalMinValue;
@DecimalMaxValue("999")
@DecimalMinValue("0")
public class PasswordValidityPeriod extends DecimalPrimitiveValue<PasswordValidityPeriod> {

	private static final long serialVersionUID = 1L;

	public PasswordValidityPeriod(BigDecimal rawValue) {
		super(rawValue);
	}

	public boolean isUnlimited() {
		// 0なら無期限
		return v().intValue() == 0;
	}
}
