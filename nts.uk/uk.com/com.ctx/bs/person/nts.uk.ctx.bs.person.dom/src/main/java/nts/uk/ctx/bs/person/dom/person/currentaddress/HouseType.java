package nts.uk.ctx.bs.person.dom.person.currentaddress;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(30)
public class HouseType extends StringPrimitiveValue<HouseType>{

	private static final long serialVersionUID = 1L;

	public HouseType(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
