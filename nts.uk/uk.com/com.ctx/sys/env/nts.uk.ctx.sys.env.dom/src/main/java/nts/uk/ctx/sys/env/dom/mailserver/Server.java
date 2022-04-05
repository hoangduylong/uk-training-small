package nts.uk.ctx.sys.env.dom.mailserver;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * The Class Server.
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(100)
public class Server extends StringPrimitiveValue<Server> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new server.
	 *
	 * @param rawValue the raw value
	 */
	public Server(String rawValue) {
		super(rawValue);
	}

}
