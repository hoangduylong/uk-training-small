package nts.uk.ctx.bs.person.dom.person.info.personnamegroup;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(40)
public class BusinessEnglishName extends StringPrimitiveValue<BusinessEnglishName>{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	
	public BusinessEnglishName(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
