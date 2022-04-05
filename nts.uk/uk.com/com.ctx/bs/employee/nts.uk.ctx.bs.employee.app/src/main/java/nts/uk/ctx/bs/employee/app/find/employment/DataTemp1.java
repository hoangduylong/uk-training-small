/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;

/**
 *  dùng cho RequestList640
 *  所属期間と雇用コード
 */
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Builder
@Getter
public class DataTemp1   {
	
	// 雇用コード
	private String employmentCode;

	// 期間
	private DatePeriod datePeriod;
	
}
