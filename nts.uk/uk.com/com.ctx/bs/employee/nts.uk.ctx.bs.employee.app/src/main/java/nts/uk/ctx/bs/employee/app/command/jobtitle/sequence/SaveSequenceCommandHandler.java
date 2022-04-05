/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.sequence;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;

import nts.arc.error.BundledBusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMaster;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class SaveSequenceCommandHandler.
 */
@Stateless
@Transactional
public class SaveSequenceCommandHandler extends CommandHandler<SaveSequenceCommand> {

	/** The repository. */
	@Inject
	private SequenceMasterRepository repository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command
	 * .CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<SaveSequenceCommand> context) {

		// Get data
		SaveSequenceCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();

		// Check required param
		if (StringUtils.isEmpty(command.getSequenceCode()) || StringUtils.isEmpty(command.getSequenceName())) {
			return;
		}

		// Validate
		this.validate(companyId, command);

		if (command.getIsCreateMode()) {
			// Add
			//final int newOrder = this.repository.findMaxOrder() + 1;
			//command.setOrder(newOrder);
			this.repository.add(command.toDomain(companyId));
		} else {
			// Update
			// Sequence code is not changable
			Optional<SequenceMaster> opSequenceMaster = this.repository.findBySequenceCode(companyId,
					command.getSequenceCode());
			
			if (opSequenceMaster.isPresent()) {
				SequenceMaster oldDomain = opSequenceMaster.get();
				command.setSequenceCode(oldDomain.getSequenceCode().v());

				this.repository.update(command.toDomain(companyId));
			}			
		}
	}

	/**
	 * Validate.
	 *
	 * @param companyId the company id
	 * @param command the command
	 */
	private void validate(String companyId, SaveSequenceCommand command) {
		boolean isError = false;
		BundledBusinessException exceptions = BundledBusinessException.newInstance();

		// Check Sequence Master
		if (command.getIsCreateMode()) {
			Optional<SequenceMaster> opSequenceMaster = this.repository.findBySequenceCode(companyId,
					command.getSequenceCode());
			if (opSequenceMaster.isPresent()) {
				// Throw Exception - Duplicated
				isError = true;
				exceptions.addMessage("Msg_3");
			}
		}

		// Has error, throws message
		if (isError) {
			exceptions.throwExceptions();
		}
	}
	
	/**
	 * Update order.
	 *
	 * @param listCommand the list command
	 */
	public void updateOrder(List<SaveSequenceCommand> listCommand) {
		String companyId = AppContexts.user().companyId();
		this.repository.updateOrder(listCommand.stream().map(command -> command.toDomain(companyId)).collect(Collectors.toList()));
	}
}
