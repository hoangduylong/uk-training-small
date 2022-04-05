/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.service.dto;
/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * Instantiates a new employee search dto.
 */
@Data
public class EmployeeSearchDto {
	
	/** The employee code. */
	private String employeeCode;
	
	/** The system. */
	private String system;
	
	/** The base date. */
	private GeneralDate baseDate;
}