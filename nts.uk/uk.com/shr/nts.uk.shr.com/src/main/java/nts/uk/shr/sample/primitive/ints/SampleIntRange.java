package nts.uk.shr.sample.primitive.ints;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

@IntegerRange(min=-1000, max=99999)
public class SampleIntRange extends IntegerPrimitiveValue<SampleIntRange> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleIntRange(Integer rawValue) {
		super(rawValue);
	}

}
