package nts.uk.ctx.sys.shared.dom.user;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(12)
public class LoginID extends StringPrimitiveValue<LoginID> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new login id.
	 *
	 * @param rawValue the raw value
	 */
	public LoginID(String rawValue) {
		super(rawValue);
	}
}