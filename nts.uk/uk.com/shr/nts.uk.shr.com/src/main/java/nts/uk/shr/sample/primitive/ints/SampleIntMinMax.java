package nts.uk.shr.sample.primitive.ints;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerMaxValue;
import nts.arc.primitive.constraint.IntegerMinValue;

@IntegerMaxValue(20000)
@IntegerMinValue(-999)
public class SampleIntMinMax extends IntegerPrimitiveValue<SampleIntMinMax> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleIntMinMax(Integer rawValue) {
		super(rawValue);
	}

}
