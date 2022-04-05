package nts.uk.ctx.sys.env.dom.useatr;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

/**
 * Code of Company
 */
@StringCharType(CharType.NUMERIC)
@StringMaxLength(4)
public class CCD extends CodePrimitiveValue<CCD>{
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public CCD(String rawValue) {
		super(rawValue);
	}

}
