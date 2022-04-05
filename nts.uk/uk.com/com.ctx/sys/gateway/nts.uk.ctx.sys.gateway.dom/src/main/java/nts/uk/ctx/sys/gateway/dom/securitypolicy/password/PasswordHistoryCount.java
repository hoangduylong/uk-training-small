package nts.uk.ctx.sys.gateway.dom.securitypolicy.password;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMaxValue;
import nts.arc.primitive.constraint.DecimalMinValue;
@DecimalMaxValue("99")
@DecimalMinValue("0")
public class PasswordHistoryCount extends DecimalPrimitiveValue<PasswordHistoryCount>{

	public PasswordHistoryCount(BigDecimal rawValue) {
		super(rawValue);
	}

	private static final long serialVersionUID = 1L;

}
