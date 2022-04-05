package nts.uk.shr.sample.primitive.decimals;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMantissaMaxLength;
import nts.arc.primitive.constraint.DecimalMaxValue;
import nts.arc.primitive.constraint.DecimalMinValue;

@DecimalMinValue("-99.99")
@DecimalMaxValue("1024.00")
@DecimalMantissaMaxLength(2)
public class SampleDecimalMinMax extends DecimalPrimitiveValue<SampleDecimalMinMax>{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public SampleDecimalMinMax(BigDecimal rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
