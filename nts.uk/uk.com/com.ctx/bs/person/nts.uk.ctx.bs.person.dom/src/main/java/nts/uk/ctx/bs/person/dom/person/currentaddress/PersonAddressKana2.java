package nts.uk.ctx.bs.person.dom.person.currentaddress;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(40)
public class PersonAddressKana2 extends StringPrimitiveValue<PersonAddressKana2> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	public PersonAddressKana2(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
