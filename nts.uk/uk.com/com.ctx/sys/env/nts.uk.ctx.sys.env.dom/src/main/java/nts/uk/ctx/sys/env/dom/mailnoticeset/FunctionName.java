package nts.uk.ctx.sys.env.dom.mailnoticeset;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.ctx.sys.env.dom.mailserver.EmailAuthentication;

@StringMaxLength(60)
public class FunctionName extends StringPrimitiveValue<EmailAuthentication> { 
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5096882464849746510L;

	public FunctionName(String rawValue) {
		super(rawValue);
	}
}
