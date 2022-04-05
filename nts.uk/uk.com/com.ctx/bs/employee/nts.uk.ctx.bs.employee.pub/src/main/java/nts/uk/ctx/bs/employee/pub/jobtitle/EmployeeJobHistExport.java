/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.jobtitle;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * The Class EmployeeJobHistExport.
 */
@Data
@Builder
// 社員所属職位履歴を取得
public class EmployeeJobHistExport {

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The job title id. */
	// 職位ID
	private String jobTitleID;

	/** The job title name. */
	// 職位名称
	private String jobTitleName;
	
	/** The sequence code. */
	// 序列コード
	private String sequenceCode;

	/** The start date. */
	// 配属期間 start
	private GeneralDate startDate;

	/** The end date. */
	// 配属期間 end
	private GeneralDate endDate;
	
	private String jobTitleCode;

}
