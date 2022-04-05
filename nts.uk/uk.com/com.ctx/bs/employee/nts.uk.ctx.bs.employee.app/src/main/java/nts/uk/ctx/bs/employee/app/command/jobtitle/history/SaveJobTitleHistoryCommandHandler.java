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
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitle;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistoryService;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class SaveJobTitleHistoryCommandHandler.
 */
@Stateless
@Transactional
public class SaveJobTitleHistoryCommandHandler extends CommandHandler<SaveJobTitleHistoryCommand> {

	/** The Constant DATE_FORMAT. */
	private static final String DATE_FORMAT = "yyyy/MM/dd";

	/** The Constant MAX_DATE. */
	private static final String MAX_DATE = "9999/12/31";

	/** The Constant LIST_HISTORY_MIN_SIZE. */
	private static final int LIST_HISTORY_MIN_SIZE = 1;

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
	protected void handle(CommandHandlerContext<SaveJobTitleHistoryCommand> context) {
		final SaveJobTitleHistoryCommand command = context.getCommand();
		final String companyId = AppContexts.user().companyId();

		Optional<JobTitle> opJobTitle = this.jobTitleRepository.findByJobTitleId(companyId, command.getJobTitleId());
		JobTitle jobTitle = opJobTitle.orElse(null);

		if (command.getIsCreateMode()) {
			this.addJobTitleHistory(companyId, command, jobTitle);
		} else {
			this.updateJobTitleHistory(companyId, command, jobTitle);
		}
	}

	/**
	 * Adds the job title history.
	 *
	 * @param companyId
	 *            the company id
	 * @param command
	 *            the command
	 * @param jobTitle
	 *            the job title
	 */
	private void addJobTitleHistory(String companyId, SaveJobTitleHistoryCommand command, JobTitle jobTitle) {

		// Get new history
		JobTitle newEntity = command.toDomain(companyId);
		newEntity.getLastestHistory().updateEndDate(GeneralDate.fromString(MAX_DATE, DATE_FORMAT));
		JobTitleHistory currentHistory = jobTitle.getLastestHistory();

		// Validate
		this.validHistory(Boolean.TRUE, currentHistory, newEntity.getLastestHistory(), Boolean.TRUE);

		// Add new history
		this.jobTitleRepository.add(newEntity);

		// Update previous history
		if (CollectionUtil.isEmpty(jobTitle.getJobTitleHistories())) {
			return;
		}
		int previousDay = -1;
		GeneralDate updatedEndDate = newEntity.getLastestHistory().span().start().addDays(previousDay);
		this.jobTitleHistoryService.updateHistory(companyId, currentHistory.identifier(), updatedEndDate);

		// Add new JobTitleInfo for new history id
		this.addJobTitleInfo(companyId, jobTitle.getJobTitleId(), currentHistory.identifier(),
				newEntity.getLastestHistory().identifier());
	}

	/**
	 * Update job title history.
	 *
	 * @param companyId
	 *            the company id
	 * @param command
	 *            the command
	 * @param jobTitle
	 *            the job title
	 */
	private void updateJobTitleHistory(String companyId, SaveJobTitleHistoryCommand command, JobTitle jobTitle) {

		// Get new history
		JobTitle updateEntity = command.toDomain(companyId);
		updateEntity.getLastestHistory().updateEndDate(GeneralDate.fromString(MAX_DATE, DATE_FORMAT));

		// If only 1 history available
		if (LIST_HISTORY_MIN_SIZE == jobTitle.getJobTitleHistories().size()) {
			// Update history
			this.jobTitleRepository.update(updateEntity);
			return;
		}

		int indexPreviousHistory = 1;
		JobTitleHistory previousHistory = jobTitle.getJobTitleHistories().get(indexPreviousHistory);

		// Validate
		this.validHistory(Boolean.FALSE, previousHistory, updateEntity.getLastestHistory(),
				updateEntity.getLastestHistory().identifier().equals(jobTitle.getLastestHistory().identifier()));

		// Add new history
		this.jobTitleRepository.update(updateEntity);

		// Update previous history
		if (LIST_HISTORY_MIN_SIZE == jobTitle.getJobTitleHistories().size()) {
			return;
		}
		int previousDay = -1;
		GeneralDate updatedEndDate = updateEntity.getLastestHistory().span().start().addDays(previousDay);
		this.jobTitleHistoryService.updateHistory(companyId, previousHistory.identifier(), updatedEndDate);
	}

	/**
	 * Valid history.
	 *
	 * @param isAddMode
	 *            the is add mode
	 * @param currentHistory
	 *            the current history
	 * @param newHistory
	 *            the new history
	 * @param isLastestHistory
	 *            the is lastest history
	 */
	private void validHistory(boolean isCreateMode, JobTitleHistory currentHistory, JobTitleHistory newHistory,
			boolean isLastestHistory) {
		boolean isError = false;
		BundledBusinessException exceptions = BundledBusinessException.newInstance();

		// Valid only new history can be edited
		if (!isCreateMode) {
			if (!isLastestHistory) {
				isError = true;
				exceptions.addMessage("Msg_154");
			}
		}

		// Valid start date
		if (currentHistory.span().start().afterOrEquals(newHistory.span().start())) {
			isError = true;
			if (isCreateMode) {
				// Add mode
				exceptions.addMessage("Msg_102");
			} else {
				// Edit mode
				exceptions.addMessage("Msg_127");
			}
		}

		// Has error, throws message
		if (isError) {
			exceptions.throwExceptions();
		}
	}

	/**
	 * Adds the job title info.
	 *
	 * @param companyId
	 *            the company id
	 * @param jobTitleId
	 *            the job title id
	 * @param originHistoryId
	 *            the origin history id
	 * @param cloneHistoryId
	 *            the clone history id
	 */
	private void addJobTitleInfo(String companyId, String jobTitleId, String originHistoryId, String cloneHistoryId) {
		Optional<JobTitleInfo> opJobTitleInfo = this.jobTitleInfoRepository.find(companyId, jobTitleId,
				originHistoryId);
		if (opJobTitleInfo.isPresent()) {
			JobTitleInfo jobTitleInfo = opJobTitleInfo.get().clone(cloneHistoryId);
			this.jobTitleInfoRepository.add(jobTitleInfo);
		}
	}
}
