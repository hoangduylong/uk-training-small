package nts.uk.ctx.bs.person.dom.person.info.personnamegroup;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(40)
public class BusinessOtherName extends StringPrimitiveValue<BusinessOtherName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	public BusinessOtherName(String rawValue) {
		super(rawValue);
	}

}
