package nts.uk.ctx.bs.employee.dom.workplace.differinfor;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

/**
 * Code of Company
 */
@StringCharType(CharType.NUMERIC)
@StringMaxLength(4)
public class Ccd extends CodePrimitiveValue<Ccd>{
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public Ccd(String rawValue) {
		super(rawValue);
	}

}
