package nts.uk.ctx.bs.person.dom.person.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(100)
public class Taste extends StringPrimitiveValue<Taste>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public Taste(String rawValue) {
		super(rawValue);
	}

}
