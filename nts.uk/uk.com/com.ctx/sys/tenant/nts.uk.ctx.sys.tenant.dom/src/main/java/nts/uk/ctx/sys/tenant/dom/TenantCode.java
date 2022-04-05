package nts.uk.ctx.sys.tenant.dom;

import nts.arc.error.BusinessException;
import nts.arc.error.RawErrorMessage;
import nts.arc.primitive.PrimitiveValueConstraintException;
import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.gul.security.checkdigit.DammCheckDigit;

@StringMaxLength(12)
@StringCharType(CharType.NUMERIC)
public class TenantCode extends StringPrimitiveValue<TenantCode> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public TenantCode(String rawValue) {
		super(rawValue);
	}
	
	public static TenantCode createNew(String source11Digits) {
		if (source11Digits.length() != 11) {
			throw new RuntimeException("invalid length: " + source11Digits);
		}
		
		long source = Long.valueOf(source11Digits);
		int checkDigit = DammCheckDigit.base10(source);
		String code = String.valueOf(source) + checkDigit;
		
		return new TenantCode(code);
	}

	@Override
	public void validate() {
		try {
			super.validate();
		} catch (PrimitiveValueConstraintException ex) {
			throw new BusinessException(new RawErrorMessage(v() + " は不正なテナントコードです。12桁の数字を入力してください。"));
		}
		
		if (v().length() < 12) {
			throw new BusinessException(new RawErrorMessage(v() + " は不正なテナントコードです。12桁の数字を入力してください。"));
		}
		
		if (!isValidCheckDigit()) {
			throw new BusinessException(new RawErrorMessage(v() + " は不正なテナントコードです。チェックディジットが一致しません。"));
		}
	}
	
	private boolean isValidCheckDigit() {
		
		long source = Long.valueOf(v().substring(0, 11));
		int expected = DammCheckDigit.base10(source);
		int actual = Integer.valueOf(v().substring(11));
		
		return expected == actual;
	}
}
