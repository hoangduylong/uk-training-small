package nts.uk.ctx.bs.person.dom.person.currentaddress;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(30)
public class HomeSituationType extends StringPrimitiveValue<HomeSituationType>{

	/**
	 * 住宅状況種別
	 */
	private static final long serialVersionUID = 1L;

	public HomeSituationType(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
