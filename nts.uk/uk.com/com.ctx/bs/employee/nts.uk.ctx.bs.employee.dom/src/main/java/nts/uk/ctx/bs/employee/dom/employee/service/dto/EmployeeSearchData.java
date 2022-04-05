/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class EmployeeSearchData.
 */
@Getter
@Setter
@Builder
public class EmployeeSearchData {
	
	/** The company id. */
	private String companyId;
	
	/** The employee id. */
	private String employeeId;

	/** The employee code. */
	private String employeeCode;

	/** The personal id. */
	private String personalId;
	
	/** The business name. */
	private String businessName;

	/** The dept display name. */
	private String deptDisplayName;
	
	/** The wkp display name. */
	private String wkpDisplayName;
}
