package nts.uk.shr.com.contact.postalcode.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 
 * @author yennth
 *
 */
@StringMaxLength(40)
public class CityKname extends StringPrimitiveValue<CityKname>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 市区町村カナ **/
	public CityKname(String rawValue) {
		super(rawValue);
	}
}
