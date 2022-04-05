package nts.uk.ctx.sys.log.dom.reference;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/*
 * author : hiep.th
 */

@StringMaxLength(50)
public class LogDetailCondition extends StringPrimitiveValue<LogDetailCondition>  {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new deletion code.
	 *
	 * @param rawValue the raw value
	 */
	public LogDetailCondition(String rawValue) {
		super(rawValue);
	}


}
