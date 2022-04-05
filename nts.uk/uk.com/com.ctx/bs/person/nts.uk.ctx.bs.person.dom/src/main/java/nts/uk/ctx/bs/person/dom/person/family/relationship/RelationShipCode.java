package nts.uk.ctx.bs.person.dom.person.family.relationship;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 家族続柄コード
 * @author lanlt
 *
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(10)
public class RelationShipCode extends StringPrimitiveValue<RelationShipCode>{
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	public RelationShipCode(String rawValue) {
		super(rawValue);
	}
}
