package nts.uk.ctx.bs.person.dom.person.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(20)
public class PersonMobile extends StringPrimitiveValue<PersonMobile> {

	private static final long serialVersionUID = 1L;

	public PersonMobile(String rawValue) {
		super(rawValue);
	}

}
