package nts.uk.ctx.bs.employee.app.command.jobtitle.affiliate;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryService;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;
@Stateless
public class DeleteAffJobTitleMainCommandHandler extends CommandHandler<DeleteAffJobTitleMainCommand>
	implements PeregDeleteCommandHandler<DeleteAffJobTitleMainCommand>{

	@Inject
	private AffJobTitleHistoryRepository affJobTitleHistoryRepository;
	
	@Inject
	private AffJobTitleHistoryItemRepository affJobTitleHistoryItemRepository;
	
	@Inject 
	private AffJobTitleHistoryService affJobTitleHistoryService;
	
	@Override
	public String targetCategoryCd() {
		return "CS00016";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteAffJobTitleMainCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteAffJobTitleMainCommand> context) {
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		
		Optional<AffJobTitleHistory> existHist = affJobTitleHistoryRepository.getListBySid(companyId, command.getEmployeeId());
		
		if (!existHist.isPresent()){
			throw new RuntimeException("invalid AffWorkplaceHistory"); 
		}
		Optional<DateHistoryItem> itemToBeDelete = existHist.get().getHistoryItems().stream()
                .filter(h -> h.identifier().equals(command.getHistId()))
                .findFirst();
		
		if (!itemToBeDelete.isPresent()){
			throw new RuntimeException("invalid AffWorkplaceHistory");
		}
		existHist.get().remove(itemToBeDelete.get());
		
		affJobTitleHistoryService.delete(existHist.get(), itemToBeDelete.get());
		
		affJobTitleHistoryItemRepository.delete(command.getHistId());
	}

}
