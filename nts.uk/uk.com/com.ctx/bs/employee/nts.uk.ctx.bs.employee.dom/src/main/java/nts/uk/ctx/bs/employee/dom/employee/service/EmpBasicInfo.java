/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

/**
 * Result RequestList61.
 */
// 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpBasicInfo {
	
	/** The birth day. */
	// 生年月日
	private GeneralDate birthDay;
	
	/** The emp id. */
	// 社員ID
	private String employeeId;
	
	/** The emp code. */
	// 社員コード
	private String employeeCode;
	

	/** The entry date. */
	// 入社年月日
	private GeneralDate entryDate;
	
	/** The gender. 
	 * Male(1), Female(2)
	 * */
	// 性別
	private int gender;

	/** The p id. */
	// 個人ID
	private String pId;

	/** The Business name. */
	// 個人名
	private String businessName;

	/** The retired date. */
	// 退職年月日
	private GeneralDate retiredDate;

}
