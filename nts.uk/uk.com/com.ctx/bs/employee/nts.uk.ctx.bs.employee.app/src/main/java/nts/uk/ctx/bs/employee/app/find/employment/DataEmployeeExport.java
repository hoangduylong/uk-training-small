/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * DataEmployeeExport dùng cho RequestList640
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class DataEmployeeExport   {
	
	private String employmentCode; // 雇用コード
 
	private String sid; // 社員ID

	public  String  pid; // 個人ID
	
}
