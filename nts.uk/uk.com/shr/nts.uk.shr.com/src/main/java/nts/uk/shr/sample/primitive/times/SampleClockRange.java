package nts.uk.shr.sample.primitive.times;

import nts.arc.primitive.TimeClockPrimitiveValue;
import nts.arc.primitive.constraint.TimeRange;

@TimeRange(min="-12:00", max="60:00")
public class SampleClockRange extends TimeClockPrimitiveValue<SampleClockRange> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleClockRange(Integer rawValue) {
		super(rawValue);
	}

}
