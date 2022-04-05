/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class AffPeriodEmpCodeExport.
 */
@Data
@Builder
// 所属期間と雇用コード
public class AffPeriodEmpCodeExport {

	/** The code. */
	// 期間
	private DatePeriod period;

	/** The employment code. */
	// 雇用コード
	private String employmentCode;
}
