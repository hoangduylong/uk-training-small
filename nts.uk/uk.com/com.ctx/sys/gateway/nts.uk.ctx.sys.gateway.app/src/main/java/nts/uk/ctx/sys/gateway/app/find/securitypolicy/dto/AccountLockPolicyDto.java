package nts.uk.ctx.sys.gateway.app.find.securitypolicy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AccountLockPolicyDto {
	public int errorCount;
	public int lockInterval;
	public String lockOutMessage;
	public boolean isUse;
}
