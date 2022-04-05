package nts.uk.ctx.sys.log.dom.reference;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.ZeroPaddedCode;

/*
 * author : hiep.th
 */

@StringMaxLength(2)
@StringCharType(CharType.NUMERIC)
@ZeroPaddedCode
public class LogSettingCode extends StringPrimitiveValue<LogSettingCode> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new deletion code.
	 *
	 * @param rawValue the raw value
	 */
	public LogSettingCode(String rawValue) {
		super(rawValue);
	}

}
