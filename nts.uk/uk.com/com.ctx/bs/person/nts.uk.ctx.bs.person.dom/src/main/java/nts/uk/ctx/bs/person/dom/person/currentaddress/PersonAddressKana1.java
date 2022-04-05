package nts.uk.ctx.bs.person.dom.person.currentaddress;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(120)
public class PersonAddressKana1 extends StringPrimitiveValue<PersonAddressKana1> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	public PersonAddressKana1(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}
}
