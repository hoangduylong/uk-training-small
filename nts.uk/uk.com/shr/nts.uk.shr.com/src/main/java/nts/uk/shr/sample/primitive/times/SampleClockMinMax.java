package nts.uk.shr.sample.primitive.times;

import nts.arc.primitive.TimeClockPrimitiveValue;
import nts.arc.primitive.constraint.TimeMaxValue;
import nts.arc.primitive.constraint.TimeMinValue;

@TimeMaxValue("60:00")
@TimeMinValue("-12:00")
public class SampleClockMinMax extends TimeClockPrimitiveValue<SampleClockMinMax> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleClockMinMax(Integer rawValue) {
		super(rawValue);
	}

}
