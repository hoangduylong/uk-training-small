/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * The Class PersonalBasicInfo.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonalBasicInfo {

	/** The pid. */
	private String pid;

	/** The business name. */
	private String businessName;

	/** The entry date. */
	private GeneralDate entryDate;

	/** The gender. */
	private int gender;

	/** The birth day. */
	private GeneralDate birthDay;

	/** The employee id. */
	private String employeeId;

	/** The employee code. */
	private String employeeCode;

	/** The retired date. */
	private GeneralDate retiredDate;
}
