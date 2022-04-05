package nts.uk.ctx.sys.portal.dom.toppagealarm;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(500)
public class LinkURL extends StringPrimitiveValue<LinkURL> {
	private static final long serialVersionUID = 1L;
	
	public LinkURL(String rawValue) {
		super(rawValue);
	}

}
