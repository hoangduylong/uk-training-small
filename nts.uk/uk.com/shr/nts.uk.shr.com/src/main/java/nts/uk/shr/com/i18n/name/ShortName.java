package nts.uk.shr.com.i18n.name;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;


/**
 * The Class ShortName.
 */
//短い呼称
@StringMaxLength(6)
public class ShortName extends StringPrimitiveValue<ShortName> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -1892853182499861425L;
	
	/**
	 * Instantiates a new short name.
	 *
	 * @param rawValue the raw value
	 */
	public ShortName(String rawValue) {
		super(rawValue);
	}

}
