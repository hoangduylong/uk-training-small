package nts.uk.ctx.sys.portal.dom.titlemenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(30)
public class Name extends StringPrimitiveValue<Name> {

	private static final long serialVersionUID = 1L;

	public Name(String rawValue) {
		super(rawValue);

	}

}
