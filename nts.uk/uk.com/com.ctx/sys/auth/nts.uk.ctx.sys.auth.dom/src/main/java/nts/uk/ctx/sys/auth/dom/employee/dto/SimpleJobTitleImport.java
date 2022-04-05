/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.employee.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * The Class JobTitleExport.
 */
// 職位
@Builder
public class SimpleJobTitleImport {

	/** The job title id. */
	// 職位ID
	@Getter
	private String jobTitleId;

	/** The job title code. */
	// 職位コード
	@Getter
	private String jobTitleCode;

	/** The job title name. */
	// 職位名称
	@Getter
	private String jobTitleName;

	/** The disporder. */
	// 序列
	private Integer disporder;

	public SimpleJobTitleImport(String jobTitleId, String jobTitleCode, String jobTitleName, Integer disporder) {
		super();
		this.jobTitleId = jobTitleId;
		this.jobTitleCode = jobTitleCode;
		this.jobTitleName = jobTitleName;
		this.disporder = disporder;
	}
	
	public Integer getDisporder() {
		if (this.disporder != null)
			return this.disporder;
		return 0;
	}
	
}
