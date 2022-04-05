/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.employment;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.employment.Employment;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentCreateEvent;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class EmpSaveCommandHandler.
 */
@Stateless
public class EmpSaveCommandHandler extends CommandHandler<EmpSaveCommand> {

	/** The repository. */
	@Inject
	private EmploymentRepository repository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command
	 * .CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<EmpSaveCommand> context) {

		// Get Company Id
		String companyId = AppContexts.user().companyId();

		// Get Command
		EmpSaveCommand command = context.getCommand();

		Employment employment = new Employment(command);

		// Find exist Employment
		Optional<Employment> empOptional = this.repository.findEmployment(companyId, command.getEmploymentCode().v());

		// Update
		if (empOptional.isPresent()) {
			// Check ADD mode
			if (!command.getIsUpdateMode()) {
				throw new BusinessException("Msg_3");
			} else {
				this.repository.update(employment);
			}
			return;
		}

		// Create
		this.repository.insert(employment);
		
		// Event::雇用が新規作成された
		val employmentCreatEvent = new EmploymentCreateEvent(employment.getCompanyId(), employment.getEmploymentCode());
		employmentCreatEvent.toBePublished();
	}

}
