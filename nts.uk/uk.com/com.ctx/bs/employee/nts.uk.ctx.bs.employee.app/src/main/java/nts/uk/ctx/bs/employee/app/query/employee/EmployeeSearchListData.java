/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.query.employee;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class EmployeeSearchListData.
 */
@Getter
@Setter
public class EmployeeSearchListData implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The employee id. */
	private String employeeId;

	/** The employee code. */
	private String employeeCode;

	/** The employee name. */
	private String employeeName;
	
	/** The workplace code. */
	private String workplaceCode;

	/** The workplace id. */
	private String workplaceId;

	/** The workplace name. */
	private String workplaceName;
	
	/** The job title id. */
	private String jobTitleId;
	
	/** The job title code. */
	private String jobTitleCode;
	
	/** The job title name. */
	private String jobTitleName;
}
