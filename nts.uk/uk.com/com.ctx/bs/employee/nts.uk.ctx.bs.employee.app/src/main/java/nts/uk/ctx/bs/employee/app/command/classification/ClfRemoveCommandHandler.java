package nts.uk.ctx.bs.employee.app.command.classification;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class ClfRemoveCommandHandler.
 */
@Stateless
public class ClfRemoveCommandHandler extends CommandHandler<ClfRemoveCommand> {
	
	/** The repository. */
	@Inject
	private ClassificationRepository repository;
	
	/* (non-Javadoc)
	 * @see nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command.CommandHandlerContext)
	 */
	@Override
	protected void handle(CommandHandlerContext<ClfRemoveCommand> context) {
		
		// Get Company Id
		String companyId = AppContexts.user().companyId();
		
		// Get Command
		ClfRemoveCommand command = context.getCommand();
		
		// Remove Employment
		this.repository.remove(companyId, command.getClassificationCode());
	}

}
