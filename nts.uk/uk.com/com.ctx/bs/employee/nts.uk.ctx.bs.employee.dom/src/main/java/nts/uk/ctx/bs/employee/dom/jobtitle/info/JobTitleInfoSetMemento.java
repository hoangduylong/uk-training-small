/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.info;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;

/**
 * The Interface JobTitleInfoSetMemento.
 */
public interface JobTitleInfoSetMemento {

	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	void setCompanyId(CompanyId companyId);

	/**
	 * Sets the job title history id.
	 *
	 * @param jobTitleHistoryId the new job title history id
	 */
	void setJobTitleHistoryId(String jobTitleHistoryId);

	/**
	 * Sets the checks if is manager.
	 *
	 * @param isManager the new checks if is manager
	 */
	void setIsManager(boolean isManager);

	/**
	 * Sets the job title id.
	 *
	 * @param jobTitleId the new job title id
	 */
	void setJobTitleId(String jobTitleId);

	/**
	 * Sets the job title code.
	 *
	 * @param jobTitleCode the new job title code
	 */
	void setJobTitleCode(JobTitleCode jobTitleCode);

	/**
	 * Sets the job title name.
	 *
	 * @param jobTitleName the new job title name
	 */
	void setJobTitleName(JobTitleName jobTitleName);

	/**
	 * Sets the sequence code.
	 *
	 * @param sequenceCode the new sequence code
	 */
	void setSequenceCode(SequenceCode sequenceCode);

}
