package nts.uk.ctx.sys.portal.dom.toppagesetting;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

/**
 * 
 * @author sonnh1
 *	 トップページコード
 */
@StringMaxLength(4)
public class TopMenuCode extends CodePrimitiveValue<TopMenuCode> {
	/**
	 * SerialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public TopMenuCode(String rawValue) {
		super(rawValue);
	}
}
