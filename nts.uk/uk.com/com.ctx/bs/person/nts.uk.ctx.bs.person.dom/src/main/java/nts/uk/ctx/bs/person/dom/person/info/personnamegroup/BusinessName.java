package nts.uk.ctx.bs.person.dom.person.info.personnamegroup;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;


@StringMaxLength(40)
public class BusinessName extends StringPrimitiveValue<BusinessName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	
	public BusinessName(String rawValue) {
		super(rawValue);
	}
}
