/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.jobtitle;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * The Class JobTitleExport.
 */
@Data
@Builder
public class JobTitleExport {

	/** The company id. */
	private String companyId;

	/** The job title id. */
	private String jobTitleId;

	/** The job title code. */
	private String jobTitleCode;

	/** The job title name. */
	private String jobTitleName;

	/** The sequence code. */
	private String sequenceCode;

	/** The start date. */
	private GeneralDate startDate;

	/** The end date. */
	private GeneralDate endDate;
	
	/** The is manager. #100055*/
	private boolean isManager;

}
