package nts.uk.ctx.sys.gateway.app.find.securitypolicy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class PasswordPolicyDto {
	public int notificationPasswordChange;
	public boolean loginCheck;
	public boolean initialPasswordChange;
	public boolean isUse;
	public int historyCount;
	public int lowestDigits;
	public int validityPeriod;
	public int alphabetDigit;
	public int numberOfDigits;
	public int symbolCharacters;

}
