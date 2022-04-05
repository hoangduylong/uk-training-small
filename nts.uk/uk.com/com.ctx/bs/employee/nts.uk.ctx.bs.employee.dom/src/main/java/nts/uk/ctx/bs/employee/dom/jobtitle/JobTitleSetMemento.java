package nts.uk.ctx.bs.employee.dom.jobtitle;

import java.util.List;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;

/**
 * The Interface JobTitleSetMemento.
 */
public interface JobTitleSetMemento {
	
	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	public void setCompanyId(CompanyId companyId);

	/**
	 * Sets the workplace id.
	 *
	 * @param jobTitleId the new job title id
	 */
	public void setJobTitleId(String jobTitleId);
	
	/**
	 * Sets the workplace history.
	 *
	 * @param jobTitleHistory the new job title history
	 */
	public void setJobTitleHistory(List<JobTitleHistory> jobTitleHistory);
}
