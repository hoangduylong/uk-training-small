/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

/**
 * The Class EmployeeBasicInfoExport.
 */
// 個人社員基本情報
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeBasicInfoExport {

	/** The p id. */
	// 個人ID
	private String pId;

	/** The emp id. */
	// 社員ID
	private String employeeId;

	/** tên biên là personName nhưng giá trị là của bussinessName (Do update tài lài chuyển từ pName -> BussinessName) */
	// 個人名
	private String pName;

	/** The gender. */
	// 性別
	private int gender;

	/** The birth day. */
	// 生年月日
	private GeneralDate birthDay;

	/** The p mail addr. */
	// 個人メールアドレス
	private MailAddress pMailAddr;

	/** The emp code. */
	// 社員コード
	private String employeeCode;

	/** The entry date. */
	// 入社年月日
	private GeneralDate entryDate;

	/** The retired date. */
	// 退職年月日
	private GeneralDate retiredDate;

	/** The company mail addr. */
	// 会社メールアドレス
	private MailAddress companyMailAddr;

}
