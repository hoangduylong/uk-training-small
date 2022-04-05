package nts.uk.ctx.bs.employee.app.command.employment.history;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistory;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryService;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteEmploymentHistoryCommandHandler extends CommandHandler<DeleteEmploymentHistoryCommand>
	implements PeregDeleteCommandHandler<DeleteEmploymentHistoryCommand>{

	@Inject
	private EmploymentHistoryRepository employmentHistoryRepository;
	@Inject
	private EmploymentHistoryItemRepository employmentHistoryItemRepository;
	
	@Inject
	private EmploymentHistoryService employmentHistoryService;
	
	@Override
	public String targetCategoryCd() {
		return "CS00014";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteEmploymentHistoryCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteEmploymentHistoryCommand> context) {
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		Optional<EmploymentHistory> existHist = employmentHistoryRepository.getByEmployeeId(companyId, command.getEmployeeId());
		
		if (!existHist.isPresent()){
			throw new RuntimeException("invalid employmentHistory"); 
		}
		Optional<DateHistoryItem> itemToBeDelete = existHist.get().getHistoryItems().stream()
                .filter(h -> h.identifier().equals(command.getHistoryId()))
                .findFirst();
		
		if (!itemToBeDelete.isPresent()){
			throw new RuntimeException("invalid employmentHistory");
		}
		existHist.get().remove(itemToBeDelete.get());
		employmentHistoryService.delete(existHist.get(),itemToBeDelete.get());
		
		employmentHistoryItemRepository.delete(command.getHistoryId());
	}

}
