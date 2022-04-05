package nts.uk.ctx.bs.person.dom.person.emergencycontact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(1000)
public class RelationShip extends StringPrimitiveValue<RelationShip>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public RelationShip(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
