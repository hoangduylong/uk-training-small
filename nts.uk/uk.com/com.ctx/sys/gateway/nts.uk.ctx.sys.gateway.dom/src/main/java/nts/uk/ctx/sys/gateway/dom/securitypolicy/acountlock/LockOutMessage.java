package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock;

import nts.arc.primitive.StringPrimitiveValue;

import nts.arc.primitive.constraint.StringMaxLength;
@StringMaxLength(100)
public class LockOutMessage extends StringPrimitiveValue<LockOutMessage>  {

	private static final long serialVersionUID = 1L;

	public LockOutMessage(String rawValue) {
		super(rawValue);
	}

}
