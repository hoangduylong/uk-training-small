/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.workplace;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class WorkplaceInfoHistExport.
 */
@Data
@Builder
// 職場情報履歴
public class WkpInfoHistExport {

	/** The period. */
	// 期間
	private DatePeriod period;

	/** The wkp code. */
	// 職場コード
	private String wkpCode;

	/** The wkp display name. */
	// 職場表示名
	private String wkpDisplayName;
}
