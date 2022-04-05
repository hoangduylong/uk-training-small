package nts.uk.shr.sample.primitive.halfints;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.HalfIntegerRange;

@HalfIntegerRange(min=-5, max=15)
public class SampleHalfIntRange extends IntegerPrimitiveValue<SampleHalfIntRange> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleHalfIntRange(Integer rawValue) {
		super(rawValue);
	}

}
