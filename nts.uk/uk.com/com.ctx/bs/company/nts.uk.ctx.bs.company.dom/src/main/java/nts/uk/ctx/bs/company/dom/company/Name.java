package nts.uk.ctx.bs.company.dom.company;

import nts.arc.primitive.StringPrimitiveValue;
//import nts.arc.primitive.constraint.CharType;
//import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * Name of Company
 */
@StringMaxLength(40)
public class Name extends StringPrimitiveValue<Name>{
	/** serialVersionUID	 */
	private static final long serialVersionUID = 1L;
	/** 会社名 */
	public Name(String rawValue) {
		super(rawValue);
	}


}
