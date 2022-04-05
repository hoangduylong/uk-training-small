package nts.uk.ctx.bs.person.dom.person.family.fullnameset;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.KANA)
@StringMaxLength(41)
public class FullNameKana extends StringPrimitiveValue<FullNameKana>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public FullNameKana(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}