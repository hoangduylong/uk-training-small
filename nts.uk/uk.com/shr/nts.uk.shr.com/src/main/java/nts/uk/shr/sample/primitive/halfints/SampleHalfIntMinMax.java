package nts.uk.shr.sample.primitive.halfints;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.HalfIntegerMaxValue;
import nts.arc.primitive.constraint.HalfIntegerMinValue;

@HalfIntegerMaxValue(10)
@HalfIntegerMinValue(-5)
public class SampleHalfIntMinMax extends IntegerPrimitiveValue<SampleHalfIntMinMax> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleHalfIntMinMax(Integer rawValue) {
		super(rawValue);
	}

}
