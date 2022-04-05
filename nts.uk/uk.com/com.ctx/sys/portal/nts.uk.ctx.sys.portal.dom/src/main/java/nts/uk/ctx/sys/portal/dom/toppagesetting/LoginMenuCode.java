package nts.uk.ctx.sys.portal.dom.toppagesetting;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;
import nts.uk.shr.com.primitive.ZeroPaddedCode;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページ.トップページコード
 *	PrimitiveValue トップページコード 
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(4)
@ZeroPaddedCode
public class LoginMenuCode extends CodePrimitiveValue<LoginMenuCode> {
	/**
	 * SerialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public LoginMenuCode(String rawValue) {
		super(rawValue);
	}
}
