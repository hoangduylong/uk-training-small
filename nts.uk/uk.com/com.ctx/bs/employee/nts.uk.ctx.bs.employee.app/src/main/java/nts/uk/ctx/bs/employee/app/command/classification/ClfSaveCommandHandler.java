package nts.uk.ctx.bs.employee.app.command.classification;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.classification.Classification;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class ClfSaveCommandHandler.
 */
@Stateless
public class ClfSaveCommandHandler extends CommandHandler<ClfSaveCommand> {

	/** The repository. */
	@Inject
	private ClassificationRepository repository;
	
	/* (non-Javadoc)
	 * @see nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command.CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<ClfSaveCommand> context) {
		
		// Get Company Id
		String companyId = AppContexts.user().companyId();
		
		// Get Command
		ClfSaveCommand command = context.getCommand();
		
		Classification classification = new Classification(command);
		
		// Find Employment
		Optional<Classification> clfOptional = this.repository.findClassification(companyId, command.getClassificationCode().v());
		
		// Update
		if (clfOptional.isPresent()) {
			if (!command.getIsUpdateMode()) {
				throw new BusinessException("Msg_3");
			} else {
				this.repository.update(classification);
			}
			return;
		}
		// Create
		this.repository.add(classification);
	}

}
