package nts.uk.ctx.sys.auth.pubimp.user;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class PasswordPolicyCountChar {
	private int numberOfDigits;
	private int symbolCharacters;
	private int alphabetDigit;
}
