/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.jobtitle;

import java.util.List;
import java.util.stream.Collectors;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobHist;

/**
 * The Class JpaJobTitleGetMemento.
 */
public class JpaJobTitleGetMemento implements JobTitleGetMemento {

	/** The cid. */
	private String cid;
	
	/** The job title id. */
	private String jobTitleId;
	
	/** The list job title history. */
	private List<BsymtJobHist> listJobTitleHistory;

	/**
	 * Instantiates a new jpa job title get memento.
	 *
	 * @param cid the cid
	 * @param jobTitleId the job title id
	 * @param listJobTitleHistory the list job title history
	 */
	public JpaJobTitleGetMemento(String cid, String jobTitleId, List<BsymtJobHist> listJobTitleHistory) {
		this.cid = cid;
		this.jobTitleId = jobTitleId;
		this.listJobTitleHistory = listJobTitleHistory;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento#getCompanyId()
	 */
	@Override
	public CompanyId getCompanyId() {
		return new CompanyId(this.cid);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento#getJobTitleId()
	 */
	@Override
	public String getJobTitleId() {
		return this.jobTitleId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleGetMemento#getJobTitleHistory
	 * ()
	 */
	@Override
	public List<JobTitleHistory> getJobTitleHistory() {
		return this.listJobTitleHistory.stream()
				.map(item -> new JobTitleHistory(new JpaJobTitleHistoryGetMemento(item)))
				.collect(Collectors.toList());
	}

}
