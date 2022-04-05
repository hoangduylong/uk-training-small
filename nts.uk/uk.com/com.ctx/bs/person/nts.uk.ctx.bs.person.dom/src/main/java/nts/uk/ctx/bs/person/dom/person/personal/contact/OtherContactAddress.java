package nts.uk.ctx.bs.person.dom.person.personal.contact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 連絡先のアドレス
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(256)
public class OtherContactAddress extends StringPrimitiveValue<OtherContactAddress> {
	/**
	*
	*/
	private static final long serialVersionUID = 1L;

	public OtherContactAddress(String rawValue) {
		super(rawValue);
	}
}
