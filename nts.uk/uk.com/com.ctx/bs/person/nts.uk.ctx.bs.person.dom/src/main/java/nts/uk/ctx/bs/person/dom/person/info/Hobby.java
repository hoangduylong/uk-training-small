package nts.uk.ctx.bs.person.dom.person.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(100)
public class Hobby extends StringPrimitiveValue<Hobby> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	public Hobby(String rawValue) {
		super(rawValue);
	}

}
