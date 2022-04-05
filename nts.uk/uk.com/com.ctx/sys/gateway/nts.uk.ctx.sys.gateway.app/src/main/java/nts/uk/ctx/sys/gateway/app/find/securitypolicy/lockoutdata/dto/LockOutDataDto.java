package nts.uk.ctx.sys.gateway.app.find.securitypolicy.lockoutdata.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDateTime;

/**
 * 
 * @author phund
 * The Class LockOutDataDto 
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LockOutDataDto {

	/** The user id. */
	private String userId;

	/** The logout date time. */
	private GeneralDateTime logoutDateTime;

	/** The log type. */
	private int lockType;

	/** The contract code. */
	private String contractCode;

	/** The login method. */
	private int loginMethod;
}
