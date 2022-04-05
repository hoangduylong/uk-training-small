package nts.uk.shr.sample.primitive.decimals;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMantissaMaxLength;
import nts.arc.primitive.constraint.DecimalRange;

@DecimalRange(min="-99.99", max="1024.00")
@DecimalMantissaMaxLength(2)
public class SampleDecimalRange extends DecimalPrimitiveValue<SampleDecimalRange>{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public SampleDecimalRange(BigDecimal rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
