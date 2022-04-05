package nts.uk.shr.sample.primitive.strings;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(20)
@StringCharType(CharType.ANY_HALF_WIDTH)
public class SampleStringAnyHalf extends StringPrimitiveValue<SampleStringAnyHalf> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleStringAnyHalf(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
