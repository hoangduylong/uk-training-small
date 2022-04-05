/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailnoticeset;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.env.app.command.mailnoticeset.employee.dto.EmployeeInfoContactDto;
import nts.uk.ctx.sys.env.app.command.mailnoticeset.employee.dto.PersonContactDto;
import nts.uk.ctx.sys.env.app.command.mailnoticeset.employee.dto.UseContactSettingDto;

/**
 * The Class MailNoticeSetSaveCommand.
 */
@Getter
@Setter
public class MailNoticeSetSaveCommand {

	/** The is password update. */
	private Boolean isPasswordUpdate;

	/** The is contact update. */
	private Boolean isContactUpdate;

	/** The old password. */
	private String oldPassword;

	/** The new password. */
	private String newPassword;

	/** The confirm new password. */
	private String confirmNewPassword;

	/** The employee info contact. */
	private EmployeeInfoContactDto employeeInfoContact;

	/** The person contact. */
	private PersonContactDto personContact;

	/** The list use contact setting. */
	private List<UseContactSettingDto> listUseContactSetting;
}
