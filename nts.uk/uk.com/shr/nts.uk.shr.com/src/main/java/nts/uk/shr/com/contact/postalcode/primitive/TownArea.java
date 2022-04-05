package nts.uk.shr.com.contact.postalcode.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 
 * @author yennth
 *
 */
@StringMaxLength(80)
public class TownArea extends StringPrimitiveValue<TownArea>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 町域 **/
	public TownArea(String rawValue) {
		super(rawValue);
	}
}
