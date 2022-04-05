/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BundledBusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitle;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryService;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class RemoveJobTitleCommandHandler.
 */
@Stateless
@Transactional
public class RemoveJobTitleCommandHandler extends CommandHandler<RemoveJobTitleCommand> {

	/** The job title repository. */
	@Inject
	private JobTitleRepository jobTitleRepository;

	/** The job title info repository. */
	@Inject
	private JobTitleInfoRepository jobTitleInfoRepository;

	/** The job title history service. */
	@Inject
	private JobTitleHistoryService jobTitleHistoryService;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command
	 * .CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<RemoveJobTitleCommand> context) {
		RemoveJobTitleCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();

		Optional<JobTitle> opJobTitle = this.jobTitleRepository.findByJobTitleId(companyId, command.getJobTitleId());
		if (!opJobTitle.isPresent()) {
			throw new RuntimeException(String.format("Job title %s not found!", command.getJobTitleId()));
		}
		JobTitle jobTitle = opJobTitle.get();
		JobTitleHistory lastestHistory = jobTitle.getLastestHistory();

		// Compare date
		GeneralDate endDate = command.getEndDate();
		GeneralDate historyStartDate = lastestHistory.span().start();
		
		// Validate
		this.validate(endDate, historyStartDate);
		
		// Remove data
		if (endDate.equals(historyStartDate)) {
			// Remove JobTitle lastest history + JobTitle associated info
			this.jobTitleRepository.removeHistory(companyId, command.getJobTitleId(), lastestHistory.identifier());
			this.jobTitleInfoRepository.remove(companyId, command.getJobTitleId(), lastestHistory.identifier());
		} 
		else {
			// Update JobTitle lastest history
			this.jobTitleHistoryService.updateLastestHistory(companyId, command.getJobTitleId(), endDate);
		}
	}
	
	/**
	 * Validate.
	 *
	 * @param endDate the end date
	 * @param historyStartDate the history start date
	 */
	private void validate(GeneralDate endDate, GeneralDate historyStartDate) {
		boolean isError = false;
		BundledBusinessException exceptions = BundledBusinessException.newInstance();

		if (endDate.before(historyStartDate)) {
			// Throw Exception - Sequence has been registered to a JobTitle
			isError = true;
			exceptions.addMessage("Msg_467");
		}

		// Has error, throws message
		if (isError) {
			exceptions.throwExceptions();
		}
	}
}
