package nts.uk.ctx.sys.gateway.dom.securitypolicy.password.complexity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Value;
import nts.arc.layer.dom.objecttype.DomainValue;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.ViolationInfo;

/**
 * 複雑さ
 * パスワードの複雑性要件
 */
@Value
public class PasswordComplexityRequirement implements DomainValue {

	/** 最低桁数 */
	private final PasswordMinimumLength minimumLength;

	/** 英字桁数 */
	private final PasswordSpecifiedCharacterDigits alphabetDigits;
	
	/** 数字桁数 */
	private final PasswordSpecifiedCharacterDigits numeralDigits;
	
	/** 記号桁数 */
	private final PasswordSpecifiedCharacterDigits symbolDigits;
	
	public static PasswordComplexityRequirement createNotCheck() {
		return new PasswordComplexityRequirement(
				new PasswordMinimumLength(0), 
				new PasswordSpecifiedCharacterDigits(0), 
				new PasswordSpecifiedCharacterDigits(0), 
				new PasswordSpecifiedCharacterDigits(0));
	}
	
	public static PasswordComplexityRequirement createFromJavaType(
			int minimumLength,
			int alphabetDigits,
			int numeralDigits,
			int symbolDigits) {
		
		return new PasswordComplexityRequirement(
				new PasswordMinimumLength(minimumLength),
				new PasswordSpecifiedCharacterDigits(alphabetDigits),
				new PasswordSpecifiedCharacterDigits(numeralDigits),
				new PasswordSpecifiedCharacterDigits(symbolDigits));
	}
	
	/**
	 * 検証する
	 * @param password
	 * @return
	 */
	public List<ViolationInfo> validatePassword(String password) {
		
		List<ViolationInfo> errorList = new ArrayList<>();
		
		
		int alphabets = 0;
		int numerals = 0;
		int symbols = 0; // 半角英数字以外はすべて記号とみなす
		
		for (int i = 0; i < password.length(); i++) {
			char c = password.charAt(i);
			if (isAlphabet(c)) {
				alphabets++;
			} else if (isNumeral(c)) {
				numerals++;
			} else {
				symbols++;
			}
		}
		
		// 総桁数不足
		if (password.length() < minimumLength.v()) {
			errorList.add(new ViolationInfo("Msg_1186", minimumLength.v()));
		}

		// 英字桁数不足
		if (alphabets < alphabetDigits.v()) {
			errorList.add(new ViolationInfo("Msg_1188", alphabetDigits.v()));
		}

		// 数字桁数不足
		if (numerals < numeralDigits.v()) {
			errorList.add(new ViolationInfo("Msg_1189", numeralDigits.v()));
		}

		// 記号桁数不足
		if (symbols < symbolDigits.v()) {
			errorList.add(new ViolationInfo("Msg_1190", symbolDigits.v()));
		}
		
		return errorList;
	}
	
	private static boolean isAlphabet(char c) {
		return 'a' <= c && c <= 'z' || 'A' <= c && c <= 'Z';
	}
	
	private static boolean isNumeral(char c) {
		return '0' <= c && c <= '9';
	}
}
