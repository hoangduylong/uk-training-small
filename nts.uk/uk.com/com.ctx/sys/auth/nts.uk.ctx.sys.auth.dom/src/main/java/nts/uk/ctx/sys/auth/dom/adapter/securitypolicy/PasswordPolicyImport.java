package nts.uk.ctx.sys.auth.dom.adapter.securitypolicy;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PasswordPolicyImport {
	private String contractCode;
	public int notificationPasswordChange;
	public boolean loginCheck;
	public boolean initialPasswordChange;
	public boolean isUse;
	public int historyCount;
	public int lowestDigits;
	public int validityPeriod;
	public int numberOfDigits;
	public int symbolCharacters;
	public int alphabetDigit;
}
