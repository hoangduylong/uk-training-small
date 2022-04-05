package nts.uk.ctx.bs.person.dom.person.currentaddress;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(240)
public class PersonAddress1 extends StringPrimitiveValue<PersonAddress1>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public PersonAddress1(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
