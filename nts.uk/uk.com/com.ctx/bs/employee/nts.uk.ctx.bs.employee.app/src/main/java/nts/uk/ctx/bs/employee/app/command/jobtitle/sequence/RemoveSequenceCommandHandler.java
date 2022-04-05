/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.sequence;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BundledBusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMaster;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class RemoveSequenceCommandHandler.
 */
@Stateless
@Transactional
public class RemoveSequenceCommandHandler extends CommandHandler<RemoveSequenceCommand> {

	/** The sequence master repository. */
	@Inject
	private SequenceMasterRepository sequenceMasterRepository;

	/** The job title info repository. */
	@Inject
	private JobTitleInfoRepository jobTitleInfoRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command
	 * .CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<RemoveSequenceCommand> context) {

		// Get data
		String companyId = AppContexts.user().companyId();
		RemoveSequenceCommand command = context.getCommand();

		Optional<SequenceMaster> opSequenceMaster = this.sequenceMasterRepository.findBySequenceCode(companyId,
				command.getSequenceCode());
		if (!opSequenceMaster.isPresent()) {
			// Throw Exception - Sequence not found
			throw new RuntimeException(String.format("Sequence code %s not found!", command.getSequenceCode()));
		}

		// Validate
		this.validate(companyId, command);

		this.sequenceMasterRepository.remove(companyId, command.getSequenceCode());
	}

	/**
	 * Validate.
	 *
	 * @param companyId
	 *            the company id
	 * @param command
	 *            the command
	 */
	private void validate(String companyId, RemoveSequenceCommand command) {
		boolean isError = false;
		BundledBusinessException exceptions = BundledBusinessException.newInstance();

		if (this.jobTitleInfoRepository.isSequenceMasterUsed(companyId, command.getSequenceCode())) {
			// Throw Exception - Sequence has been registered to a JobTitle
			isError = true;
			exceptions.addMessage("Msg_521");
		}

		// Has error, throws message
		if (isError) {
			exceptions.throwExceptions();
		}
	}
}
