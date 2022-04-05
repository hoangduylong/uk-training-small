/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.command.securitypolicy.lockoutdata;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 *
 *
 * the Class LockOutDataDeleteCommand
 */
@Getter
@Setter

public class LockOutDataDeleteCommand {

	/** The lock out data dto. */
	private List<String> lstUserId;

	/**
	 * Instantiates a new lock out data command.
	 */
	public LockOutDataDeleteCommand() {
		super();
	}

}
