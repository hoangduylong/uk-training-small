package nts.uk.ctx.sys.shared.dom.user;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(41)
public class UserName extends StringPrimitiveValue<UserName> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new user name.
	 *
	 * @param rawValue the raw value
	 */
	public UserName(String rawValue) {
		super(rawValue);
	}
}
