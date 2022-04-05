/**
 * 
 */
package nts.uk.ctx.bs.employee.app.command.classification.affiliate;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItemRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistory;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepositoryService;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

/**
 * @author danpv
 * @author hop.nt
 */
@Stateless
public class DeleteAffClassCommandHandler extends CommandHandler<DeleteAffClassificationCommand>
		implements PeregDeleteCommandHandler<DeleteAffClassificationCommand> {
	
	@Inject
	private AffClassHistoryRepository affClassHistoryRepo;

	@Inject
	private AffClassHistItemRepository affClassHistItemRepo;
	
	@Inject
	private AffClassHistoryRepositoryService affClassHistoryRepositoryService;

	@Override
	public String targetCategoryCd() {
		return "CS00004";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteAffClassificationCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteAffClassificationCommand> context) {
		DeleteAffClassificationCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		
		Optional<AffClassHistory> historyOption = affClassHistoryRepo.getByEmployeeId(companyId,command.getEmployeeId());
		if ( !historyOption.isPresent()) {
			throw new RuntimeException("Invalid AffClassHistory");
		}
		AffClassHistory history = historyOption.get();
		Optional<DateHistoryItem> itemToBeDeleteOpt = history.getPeriods().stream()
				.filter(h -> h.identifier().equals(command.getHistoryId())).findFirst();
		if ( !itemToBeDeleteOpt.isPresent()) {
			throw new RuntimeException("Invalid AffClassHistory");
		}
		DateHistoryItem itemToBeDelete = itemToBeDeleteOpt.get();
		historyOption.get().remove(itemToBeDelete);
		
		affClassHistoryRepositoryService.delete(history, itemToBeDelete);
		
		affClassHistItemRepo.delete(command.getHistoryId());
	}

}
