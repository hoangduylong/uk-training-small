package nts.uk.ctx.bs.person.dom.person.family;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;


@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(2)
public class RelationShip extends StringPrimitiveValue<RelationShip>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	public RelationShip(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}