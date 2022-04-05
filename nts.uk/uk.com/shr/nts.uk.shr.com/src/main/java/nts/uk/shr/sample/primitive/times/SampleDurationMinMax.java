package nts.uk.shr.sample.primitive.times;

import nts.arc.primitive.TimeDurationPrimitiveValue;
import nts.arc.primitive.constraint.TimeMaxValue;
import nts.arc.primitive.constraint.TimeMinValue;

@TimeMaxValue("60:00")
@TimeMinValue("-12:00")
public class SampleDurationMinMax extends TimeDurationPrimitiveValue<SampleDurationMinMax> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleDurationMinMax(Integer rawValue) {
		super(rawValue);
	}

}
