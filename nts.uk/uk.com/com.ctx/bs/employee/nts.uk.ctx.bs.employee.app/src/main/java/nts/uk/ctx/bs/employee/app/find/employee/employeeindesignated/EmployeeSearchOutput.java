/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employee.employeeindesignated;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

/**
 * The Class EmployeeSearchOutput.
 */
@Data
@Builder
public class EmployeeSearchOutput implements Serializable{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The employee id. */
	private String employeeId;

	/** The employee code. */
	private String employeeCode;
	
	/** The employee name. */
	private String employeeName;
	
	/** The work place code. */
	private String workplaceCode;
	
	/** The work place id. */
	private String workplaceId;
	
	/** The work place name. */
	private String workplaceName;
	
}
