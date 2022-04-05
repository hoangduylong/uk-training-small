package nts.uk.ctx.sys.gateway.dom.securitypolicy.password.complexity;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * 複雑さ桁数
 * 特定の文字種の最少文字数
 */
@IntegerRange(min = 0, max = 8)
public class PasswordSpecifiedCharacterDigits extends IntegerPrimitiveValue<PasswordSpecifiedCharacterDigits> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public PasswordSpecifiedCharacterDigits(Integer rawValue) {
		super(rawValue);
	}

}
