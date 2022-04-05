package nts.uk.shr.sample.primitive.longs;

import nts.arc.primitive.LongPrimitiveValue;
import nts.arc.primitive.constraint.LongMaxValue;
import nts.arc.primitive.constraint.LongMinValue;

@LongMaxValue(20000)
@LongMinValue(-999)
public class SampleLongRange extends LongPrimitiveValue<SampleLongRange> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;


	public SampleLongRange(Long rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
