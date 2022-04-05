package nts.uk.ctx.bs.employee.dom.jobtitle;

import java.util.List;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;

/**
 * The Interface JobTitleGetMemento.
 */
public interface JobTitleGetMemento {
	
	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	public CompanyId getCompanyId();

	/**
	 * Gets the job title id.
	 *
	 * @return the job title id
	 */
	public String getJobTitleId();
	
	/**
	 * Gets the job title history.
	 *
	 * @return the job title history
	 */
	public List<JobTitleHistory> getJobTitleHistory();
}
