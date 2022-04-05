package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMaxValue;
import nts.arc.primitive.constraint.DecimalMinValue;
@DecimalMaxValue("99")
@DecimalMinValue("1")
public class ErrorCount extends DecimalPrimitiveValue<ErrorCount>{

	public ErrorCount(BigDecimal rawValue) {
		super(rawValue);
	}

	private static final long serialVersionUID = 1L;

}
