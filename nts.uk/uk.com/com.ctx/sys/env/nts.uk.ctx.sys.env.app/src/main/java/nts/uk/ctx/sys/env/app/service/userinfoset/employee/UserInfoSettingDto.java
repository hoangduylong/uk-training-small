/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.service.userinfoset.employee;

import nts.uk.ctx.sys.env.app.find.mailnoticeset.employee.UseContactSettingDto;

/**
 * The Class UserInfoSettingDto.
 */
public class UserInfoSettingDto {
	
	/** The use contact setting dto. */
	public UseContactSettingDto useContactSettingDto;
	
	/** The Employee dto. */
	//Imported(環境)「社員」
	public EmployeeDto EmployeeDto;
	
	/** The Password policy dto. */
	//Imported(環境)「パスワードポリシー」
	public PasswordPolicyDto PasswordPolicyDto;
	
	/** The Employee contact dto. */
	//Imported(環境)「社員連絡先」
	public EmployeeContactDto EmployeeContactDto;
	
	/** The Personal contact dto. */
	//Imported(環境)「個人連絡先」
	public PersonalContactDto PersonalContactDto;
}
