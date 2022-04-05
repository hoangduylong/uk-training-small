package nts.uk.shr.com.contact.postalcode.primitive;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 
 * @author yennth
 *
 */
@StringMaxLength(20)
public class StatePro extends StringPrimitiveValue<StatePro>{
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	/** 都道府県 **/
	public StatePro(String rawValue) {
		super(rawValue);
	}
}
