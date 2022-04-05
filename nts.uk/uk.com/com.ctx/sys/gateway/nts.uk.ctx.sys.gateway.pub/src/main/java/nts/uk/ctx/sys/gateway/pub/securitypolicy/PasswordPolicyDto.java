package nts.uk.ctx.sys.gateway.pub.securitypolicy;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class PasswordPolicyDto {
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
