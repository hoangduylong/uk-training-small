package nts.uk.ctx.bs.person.dom.person.family.relationship;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 家族続柄名称
 * @author lanlt
 *
 */
@StringMaxLength(12)
public class RelationShipName extends StringPrimitiveValue<RelationShipName>{
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	public RelationShipName(String rawValue) {
		super(rawValue);
	}

}
