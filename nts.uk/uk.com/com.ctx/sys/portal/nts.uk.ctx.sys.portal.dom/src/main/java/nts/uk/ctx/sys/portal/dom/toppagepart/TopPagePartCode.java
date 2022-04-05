package nts.uk.ctx.sys.portal.dom.toppagepart;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.ZeroPaddedCode;

/**
 * トップページ部品コード
 * @author LamDT
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(4)
@ZeroPaddedCode
public class TopPagePartCode extends StringPrimitiveValue<TopPagePartCode> {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public TopPagePartCode(String rawValue) {
		super(rawValue);
	}

}
