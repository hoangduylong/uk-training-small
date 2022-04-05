package nts.uk.ctx.bs.employee.app.command.workplace.affiliate;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryService;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistory;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteAffWorkplaceHistoryCommandHandler extends CommandHandler<DeleteAffWorkplaceHistoryCommand>
	implements PeregDeleteCommandHandler<DeleteAffWorkplaceHistoryCommand>{
	
	@Inject
	private AffWorkplaceHistoryRepository affWorkplaceHistoryRepository;
	
	@Inject
	private AffWorkplaceHistoryItemRepository affWorkplaceHistoryItemRepository;
	
	@Inject 
	private AffWorkplaceHistoryService affWorkplaceHistoryService;
	
	@Override
	public String targetCategoryCd() {
		return "CS00017";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteAffWorkplaceHistoryCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteAffWorkplaceHistoryCommand> context) {
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		Optional<AffWorkplaceHistory> existHist = affWorkplaceHistoryRepository.getByEmployeeId(companyId, command.getEmployeeId());
		
		if (!existHist.isPresent()){
			throw new RuntimeException("invalid AffWorkplaceHistory"); 
		}
			
		Optional<DateHistoryItem> itemToBeDeleted = existHist.get().getHistoryItems().stream()
                .filter(h -> h.identifier().equals(command.getHistoryId()))
                .findFirst();
		
		if (!itemToBeDeleted.isPresent()){
			throw new RuntimeException("invalid AffWorkplaceHistory");
		}
		existHist.get().remove(itemToBeDeleted.get());
		
		affWorkplaceHistoryService.delete(existHist.get(), itemToBeDeleted.get());
		
		affWorkplaceHistoryItemRepository.delete(command.getHistoryId());
	}
	
}
