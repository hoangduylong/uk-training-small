package nts.uk.ctx.bs.person.dom.person.family.fullnameset;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(41)
public class FullName extends StringPrimitiveValue<FullName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	public FullName(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
