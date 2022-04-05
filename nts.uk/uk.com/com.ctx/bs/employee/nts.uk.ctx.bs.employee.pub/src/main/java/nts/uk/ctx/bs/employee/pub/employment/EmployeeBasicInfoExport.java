/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

/**
 * EmploymentInfoExport dùng cho RequestList638
 */
// 雇用
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class EmployeeBasicInfoExport   {
	
	private String employmentCode; // 雇用コード

	private GeneralDate dateJoinComp; // 入社日

	private String sid; // 社員ID

	private GeneralDate birthday; // 誕生日
	
	public  String  pid; // 個人ID
	
}
