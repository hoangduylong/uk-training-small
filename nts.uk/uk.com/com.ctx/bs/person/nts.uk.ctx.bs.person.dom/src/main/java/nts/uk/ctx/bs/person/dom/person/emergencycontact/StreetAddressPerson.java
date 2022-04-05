package nts.uk.ctx.bs.person.dom.person.emergencycontact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(1000)
public class StreetAddressPerson extends StringPrimitiveValue<StreetAddressPerson>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public StreetAddressPerson(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
