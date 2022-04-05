/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.history;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitle;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryService;

/**
 * The Class JobTitleHistoryServiceImpl.
 */
@Stateless
public class JobTitleHistoryServiceImpl implements JobTitleHistoryService {

	/** The job title repository. */
	@Inject
	private JobTitleRepository jobTitleRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryService#
	 * updateHistory(java.lang.String, java.lang.String,
	 * nts.arc.time.GeneralDate)
	 */
	@Override
	public void updateHistory(String companyId, String historyId, GeneralDate endĐate) {
		Optional<JobTitle> opJobTitle = this.jobTitleRepository.findByHistoryId(companyId, historyId);
		if (!opJobTitle.isPresent()) {
			throw new RuntimeException(String.format("History id %s didn't existed.", historyId));
		}

		// Set end date of previous history
		JobTitle jobTitle = opJobTitle.get();
		jobTitle.getLastestHistory().updateEndDate(endĐate);
		this.jobTitleRepository.update(jobTitle);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryService#
	 * updateLastestHistory(java.lang.String, java.lang.String,
	 * nts.arc.time.GeneralDate)
	 */
	@Override
	public void updateLastestHistory(String companyId, String jobTitleId, GeneralDate endĐate) {
		Optional<JobTitle> opJobTitle = this.jobTitleRepository.findByJobTitleId(companyId, jobTitleId);
		if (!opJobTitle.isPresent()) {
			throw new RuntimeException(String.format("Job title %s not found!", jobTitleId));
		}

		// Set end date of previous history
		JobTitle jobTitle = opJobTitle.get();
		jobTitle.getLastestHistory().updateEndDate(endĐate);
		this.jobTitleRepository.update(jobTitle);
	}
}
