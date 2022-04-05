package nts.uk.shr.sample.primitive.longs;

import nts.arc.primitive.LongPrimitiveValue;
import nts.arc.primitive.constraint.LongRange;

@LongRange(min=-999,max=20000)
public class SampleLongMinMax extends LongPrimitiveValue<SampleLongMinMax> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;


	public SampleLongMinMax(Long rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
