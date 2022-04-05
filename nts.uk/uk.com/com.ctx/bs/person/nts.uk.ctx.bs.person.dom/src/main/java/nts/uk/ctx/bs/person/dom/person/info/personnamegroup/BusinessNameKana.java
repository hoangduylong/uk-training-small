package nts.uk.ctx.bs.person.dom.person.info.personnamegroup;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.KANA)
@StringMaxLength(40)
public class BusinessNameKana extends StringPrimitiveValue<BusinessNameKana>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public BusinessNameKana(String rawValue) {
		super(rawValue);
	}

}
