/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.command.changepassword;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class MailNoticeSetSaveCommand.
 */
@Getter
@Setter
public class ChangePasswordCommand {

	/** The old password. */
	private String oldPassword;

	/** The new password. */
	private String newPassword;

	/** The confirm new password. */
	private String confirmNewPassword;
}
