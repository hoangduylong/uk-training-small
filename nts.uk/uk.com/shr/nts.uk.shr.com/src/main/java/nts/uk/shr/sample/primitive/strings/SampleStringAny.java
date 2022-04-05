package nts.uk.shr.sample.primitive.strings;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(20)
public class SampleStringAny extends StringPrimitiveValue<SampleStringAny> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleStringAny(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
