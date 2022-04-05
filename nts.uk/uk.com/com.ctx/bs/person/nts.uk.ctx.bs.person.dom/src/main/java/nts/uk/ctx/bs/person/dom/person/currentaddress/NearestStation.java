package nts.uk.ctx.bs.person.dom.person.currentaddress;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(30)
public class NearestStation extends StringPrimitiveValue<NearestStation>{

	private static final long serialVersionUID = 1L;

	public NearestStation(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
