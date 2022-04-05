package nts.uk.ctx.sys.gateway.app.command.securitypolicy;

import lombok.AllArgsConstructor;
import lombok.Value;

@AllArgsConstructor
@Value
public class UpdateAccountPolicyCommand {
	public int errorCount;
	public int lockInterval;
	public String lockOutMessage;
	public boolean isAccLockUse;
	
	public int notificationPasswordChange;
	public boolean loginCheck;
	public boolean initialPasswordChange;
	public boolean isPasswordUse;
	public int historyCount;
	public int lowestDigits;
	public int validityPeriod;
	public int numberOfDigits;
	public int symbolCharacters;
	public int alphabetDigit;

}
