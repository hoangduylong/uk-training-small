package nts.uk.ctx.sys.auth.dom.employee.dto;

import lombok.Getter;
import nts.arc.time.GeneralDate;

@Getter

public class EmJobTitleHisImport {

	/** 社員ID */
	private String employeeID;
	
	/** 職位ID */
	private String jobTitleID;
	
	/** 職位名称 */
	private String jobTitleName;
	
	/** 配属期間 The start date. */
	private GeneralDate startDate;

	/** 配属期間 The end date. */
	private GeneralDate endDate;

	public EmJobTitleHisImport(String employeeID, String jobTitleID, String jobTitleName, GeneralDate startDate,
			GeneralDate endDate) {
		super();
		this.employeeID = employeeID;
		this.jobTitleID = jobTitleID;
		this.jobTitleName = jobTitleName;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
}
