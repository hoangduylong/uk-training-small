/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.classification;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class SClsHistExport.
 */
@Data
@Builder
// 社員所属分類履歴を取得
public class SClsHistExport {
	/** The period. */
	// 配属期間
	private DatePeriod period;

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The job title code. */
	// 分類コード
	private String classificationCode;

	/** The job title name. */
	// 分類名称
	private String classificationName;

}
