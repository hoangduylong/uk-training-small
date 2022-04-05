package nts.uk.shr.com.license.option.purchasestate;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import nts.arc.error.BusinessException;
import nts.arc.error.RawErrorMessage;
import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.gul.security.checkdigit.DammCheckDigit;

@StringMaxLength(7)
@StringCharType(CharType.NUMERIC)
public class OptionCode extends StringPrimitiveValue<OptionCode>{

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public OptionCode(String rawValue) {
		super(rawValue);
	}

	public static OptionCode createNew(String source6Digits) {
		if (source6Digits.length() != 6) {
			throw new RuntimeException("invalid length: " + source6Digits);
		}

		long source = Long.valueOf(source6Digits);
		int checkDigit = DammCheckDigit.base10(source);
		String code = String.valueOf(source) + checkDigit;

		return new OptionCode(code);
	}

    @Override
    public void validate() {
    	super.validate();

		if(this.v().length() < 7) {
			throw new BusinessException(new RawErrorMessage(v() + " は不正なオプションコードです。7桁の数字を入力してください。"));
		}

		boolean isValid = this.validateNoThrow();
		if (!isValid) {
			throw new BusinessException(new RawErrorMessage(v() + " は不正なオプションコードです。チェックディジットが一致しません。"));
		}
    }

	private boolean validateNoThrow() {
		long source = Long.valueOf(v().substring(0, 5));
		int expected = DammCheckDigit.base10(source);
		int actual = Integer.valueOf(v().substring(6));

		return expected == actual;
	}

	public List<OptionType> restore() {
		this.validate();

		String binaryString = StringUtils.leftPad(
				Integer.toBinaryString(Integer.valueOf(this.v().substring(0, 5))),
				OptionType.maxCheckDigitNo() + 1, '0');

		int i = OptionType.maxCheckDigitNo();
		List<OptionType> result = new ArrayList<>();
		for (char c : binaryString.toCharArray()) {
			if (c == '1') {
				OptionType ot = OptionType.parse(i);
				result.add(ot);
			}
			i--;
		}
		return result;
	}
}
