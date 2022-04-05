package nts.uk.ctx.sys.gateway.dom.securitypolicy.password.complexity;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * パスワード最低桁数
 */
@IntegerRange(min = 1, max = 8)
public class PasswordMinimumLength extends IntegerPrimitiveValue<PasswordMinimumLength> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public PasswordMinimumLength(Integer rawValue) {
		super(rawValue);
	}

}
