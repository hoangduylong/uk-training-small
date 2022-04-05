package nts.uk.ctx.sys.portal.dom.toppagealarm;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(200)
public class DisplayMessage extends StringPrimitiveValue<DisplayMessage> {
	private static final long serialVersionUID = 1L;
	
	public DisplayMessage(String rawValue) {
		super(rawValue);
	}

}
