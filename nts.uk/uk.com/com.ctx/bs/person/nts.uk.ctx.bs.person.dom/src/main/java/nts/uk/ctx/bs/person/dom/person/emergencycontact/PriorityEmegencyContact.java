package nts.uk.ctx.bs.person.dom.person.emergencycontact;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

@IntegerRange(max = 9999, min = 0)
public class PriorityEmegencyContact extends IntegerPrimitiveValue<PriorityEmegencyContact>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public PriorityEmegencyContact(Integer rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
