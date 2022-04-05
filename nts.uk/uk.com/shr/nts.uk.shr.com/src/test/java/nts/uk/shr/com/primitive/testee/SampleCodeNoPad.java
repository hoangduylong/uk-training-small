package nts.uk.shr.com.primitive.testee;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(4)
public class SampleCodeNoPad extends CodePrimitiveValue<SampleCodeNoPad> {

    /** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public SampleCodeNoPad(String rawValue) {
        super(rawValue);
    }
    
}
