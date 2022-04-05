/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *  dùng cho RequestList640
 *  社員ID（List）と指定期間から社員の雇用履歴を取得
 */
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DataTemp   {
	
	// 社員ID
	private String sid;

	// 所属期間と雇用コード
	private List<DataTemp1> listEmpCodeAndDatePeriod;
	
}
