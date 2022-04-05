/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employment.dto;

import lombok.Builder;
import lombok.Data;

/**
 * The Class EmploymentHistoryItemDto.
 */
@Builder
@Data
public class EmploymentHistoryItemDto {
	
	/** The history id. */
	private String historyId;
	
	/** The employee id. */
	private String employeeId;
	
	/** The salary segment. */
	private Integer salarySegment;
	
	/** The employment code. */
	private String employmentCode;
}
