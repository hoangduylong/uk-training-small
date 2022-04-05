package nts.uk.shr.sample.primitive.times;

import nts.arc.primitive.TimeDurationPrimitiveValue;
import nts.arc.primitive.constraint.TimeRange;

@TimeRange(min="-12:00", max="60:00")
public class SampleDurationRange extends TimeDurationPrimitiveValue<SampleDurationRange> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleDurationRange(Integer rawValue) {
		super(rawValue);
	}

}
