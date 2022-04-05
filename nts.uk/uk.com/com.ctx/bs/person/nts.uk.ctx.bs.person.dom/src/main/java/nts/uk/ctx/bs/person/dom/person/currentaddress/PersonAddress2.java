package nts.uk.ctx.bs.person.dom.person.currentaddress;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(80)
public class PersonAddress2 extends StringPrimitiveValue<PersonAddress2>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public PersonAddress2(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
