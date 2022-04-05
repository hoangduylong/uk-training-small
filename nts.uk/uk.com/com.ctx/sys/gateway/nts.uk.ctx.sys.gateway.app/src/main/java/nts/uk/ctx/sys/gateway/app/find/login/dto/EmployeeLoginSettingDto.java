/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.find.login.dto;

import lombok.Data;

/**
 * The Class EmployeeLoginSettingDto.
 */
@Data
public class EmployeeLoginSettingDto {

	/** The goto form 1. */
	private boolean gotoForm1;

	/**
	 * @param gotoForm1
	 */
	public EmployeeLoginSettingDto(boolean gotoForm1) {
		this.gotoForm1 = gotoForm1;
	}
}
