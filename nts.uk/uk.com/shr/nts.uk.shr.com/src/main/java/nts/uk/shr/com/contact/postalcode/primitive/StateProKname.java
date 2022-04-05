package nts.uk.shr.com.contact.postalcode.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(20)
public class StateProKname extends StringPrimitiveValue<StateProKname>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 都道府県カナ **/
	public StateProKname(String rawValue) {
		super(rawValue);
	}
}
