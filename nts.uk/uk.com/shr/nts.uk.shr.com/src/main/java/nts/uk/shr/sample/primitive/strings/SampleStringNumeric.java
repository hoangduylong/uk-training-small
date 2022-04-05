package nts.uk.shr.sample.primitive.strings;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(20)
@StringCharType(CharType.NUMERIC)
public class SampleStringNumeric extends StringPrimitiveValue<SampleStringNumeric> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleStringNumeric(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
