package nts.uk.ctx.sys.gateway.app.command.securitypolicy.lockoutdata;

import lombok.Getter;

/*
 * @author: Nguyen Van Hanh
 */
@Getter
public class AddLockOutDataCommand {
	/** The value. */
	private String userID;
}
