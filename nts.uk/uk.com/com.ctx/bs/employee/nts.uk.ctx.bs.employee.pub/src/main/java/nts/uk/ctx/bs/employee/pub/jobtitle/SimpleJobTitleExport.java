/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.jobtitle;

import lombok.Builder;
import lombok.Data;

/**
 * The Class JobTitleExport.
 */
// 職位
@Data
@Builder
public class SimpleJobTitleExport {

	/** The job title id. */
	// 職位ID
	private String jobTitleId;

	/** The job title code. */
	// 職位コード
	private String jobTitleCode;

	/** The job title name. */
	// 職位名称
	private String jobTitleName;

	/** The disporder. */
	// 序列
	private Integer disporder;

}
