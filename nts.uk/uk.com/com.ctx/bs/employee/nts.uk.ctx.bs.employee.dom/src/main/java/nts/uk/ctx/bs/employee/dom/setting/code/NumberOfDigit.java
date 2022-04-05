package nts.uk.ctx.bs.employee.dom.setting.code;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerMaxValue;

@IntegerMaxValue(17)
public class NumberOfDigit extends IntegerPrimitiveValue<NumberOfDigit> {
	private static final long serialVersionUID = 1L;

	public NumberOfDigit(Integer rawValue) {
		super(rawValue);
	}

}
