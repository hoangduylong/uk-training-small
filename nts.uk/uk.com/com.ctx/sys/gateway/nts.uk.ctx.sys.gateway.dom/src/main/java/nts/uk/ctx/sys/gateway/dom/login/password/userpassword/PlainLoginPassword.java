package nts.uk.ctx.sys.gateway.dom.login.password.userpassword;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(30)
@StringCharType(CharType.ANY_HALF_WIDTH)
public class PlainLoginPassword extends StringPrimitiveValue<PlainLoginPassword> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new hash password.
	 *
	 * @param rawValue the raw value
	 */
	public PlainLoginPassword(String rawValue) {
		super(rawValue);
	}
}