package nts.uk.ctx.sys.env.dom.mailserver;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class EmailAuthentication.
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(80)
public class EmailAuthentication extends StringPrimitiveValue<EmailAuthentication> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 3072948248326997648L;

	/**
	 * Instantiates a new email authentication.
	 *
	 * @param rawValue the raw value
	 */
	public EmailAuthentication(String rawValue) {
		super(rawValue);
	}
	
}
