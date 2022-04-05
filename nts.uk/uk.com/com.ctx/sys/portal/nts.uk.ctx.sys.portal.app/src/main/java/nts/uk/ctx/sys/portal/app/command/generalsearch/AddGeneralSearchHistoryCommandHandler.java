package nts.uk.ctx.sys.portal.app.command.generalsearch;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.generalsearch.GeneralSearchHistory;
import nts.uk.ctx.sys.portal.dom.generalsearch.GeneralSearchRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class AddGeneralSearchHistoryCommandHandler.
 */
@Stateless
@Transactional
public class AddGeneralSearchHistoryCommandHandler extends CommandHandler<GeneralSearchHistoryCommand> {
	/** The repo. */
	@Inject
	private GeneralSearchRepository repo;

	/**
	 * Handle.
	 *
	 * @param context the context
	 */
	@Override
	protected void handle(CommandHandlerContext<GeneralSearchHistoryCommand> context) {
		GeneralSearchHistoryCommand command = context.getCommand();
		this.repo.insert(GeneralSearchHistory.createFromMemento(command), AppContexts.user().companyId(), AppContexts.user().contractCode());
	}
}
