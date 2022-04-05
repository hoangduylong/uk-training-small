/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment;

import java.util.List;

import lombok.Builder;
import lombok.Data;

/**
 * The Class AffPeriodEmpCdHistExport.
 */
@Data
@Builder
// 社員ID（List）と指定期間から社員の雇用履歴を取得
public class AffPeriodEmpCdHistExport {

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The aff period emp code exports. */
	// 所属期間と雇用コード
	private List<AffPeriodEmpCodeExport> affPeriodEmpCodeExports;
}
