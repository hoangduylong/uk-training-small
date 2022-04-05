/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.shared.dom.employee.syworkplace;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class SWkpHistImport.
 */
@Data
@AllArgsConstructor
public class SyaWkpHistImport {
	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	/** The workplace id. */
	// 職場ID
	private String workplaceId;
	
	/** The work place name. */
	//職場名称
	private String workPlaceName;

	/** The date range. */
	// 配属期間
	private DatePeriod dateRange;
}
