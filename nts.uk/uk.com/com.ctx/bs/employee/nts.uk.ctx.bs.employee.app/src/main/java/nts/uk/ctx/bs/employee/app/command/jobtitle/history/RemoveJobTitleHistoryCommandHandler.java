/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.history;

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
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryService;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class RemoveJobTitleHistoryCommandHandler.
 */
@Stateless
@Transactional
public class RemoveJobTitleHistoryCommandHandler extends CommandHandler<RemoveJobTitleHistoryCommand> {

	/** The Constant DATE_FORMAT. */
	private static final String DATE_FORMAT = "yyyy/MM/dd";

	/** The Constant MAX_DATE. */
	private static final String MAX_DATE = "9999/12/31";

	/** The Constant LIST_HISTORY_MIN_SIZE. */
	private static final Integer LIST_HISTORY_MIN_SIZE = 1;

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
	protected void handle(CommandHandlerContext<RemoveJobTitleHistoryCommand> context) {
		RemoveJobTitleHistoryCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();

		Optional<JobTitle> opJobTitle = this.jobTitleRepository.findByJobTitleId(companyId, command.getJobTitleId());
		if (!opJobTitle.isPresent()) {
			throw new RuntimeException(String.format("Job title %s not found!", command.getJobTitleId()));
		}
		JobTitle jobTitle = opJobTitle.get();

		// Validate
		this.validHistory(jobTitle, command.getHistoryId());

		// Remove history
		this.jobTitleRepository.removeHistory(companyId, command.getJobTitleId(), command.getHistoryId());
		this.jobTitleInfoRepository.remove(companyId, command.getJobTitleId(), command.getHistoryId());

		// Update lastest history
		this.jobTitleHistoryService.updateLastestHistory(companyId, jobTitle.getJobTitleId(),
				GeneralDate.fromString(MAX_DATE, DATE_FORMAT));
	}

	/**
	 * Valid history.
	 *
	 * @param jobTitleInfo
	 *            the job title info
	 * @param removeHistoryId
	 *            the remove history id
	 */
	private void validHistory(JobTitle jobTitleInfo, String removeHistoryId) {
		boolean isError = false;
		BundledBusinessException exceptions = BundledBusinessException.newInstance();

		// Only 1 history remain, can't remove
		if (jobTitleInfo.getJobTitleHistories().size() <= LIST_HISTORY_MIN_SIZE) {
			isError = true;
			exceptions.addMessage("Msg_57");
		}

		// Can only remove the lastest history
		if (!jobTitleInfo.getLastestHistory().identifier().equals(removeHistoryId)) {
			isError = true;
			exceptions.addMessage("Msg_55");
		}

		// Has error, throws message
		if (isError) {
			exceptions.throwExceptions();
		}
	}
}
