package nts.uk.ctx.sys.log.dom.reference;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/*
 * author : hiepth
 */

@StringMaxLength(50)
public class LogCondition extends StringPrimitiveValue<LogCondition>  {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new deletion code.
	 *
	 * @param rawValue the raw value
	 */
	public LogCondition(String rawValue) {
		super(rawValue);
	}


}
