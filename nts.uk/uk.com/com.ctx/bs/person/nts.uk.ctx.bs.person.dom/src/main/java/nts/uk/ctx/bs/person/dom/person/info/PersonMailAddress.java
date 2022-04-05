package nts.uk.ctx.bs.person.dom.person.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(80)
public class PersonMailAddress extends StringPrimitiveValue<PersonMailAddress>{

	private static final long serialVersionUID = 1L;

	public PersonMailAddress(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
