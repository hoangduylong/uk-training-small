package nts.uk.ctx.bs.employee.app.command.temporaryabsence;


import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHistory;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistoryService;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsItemRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteTemporaryAbsenceCommandHandler extends CommandHandler<DeleteTemporaryAbsenceCommand>
	implements PeregDeleteCommandHandler<DeleteTemporaryAbsenceCommand>{

	@Inject
	private TempAbsItemRepository temporaryAbsenceRepository;
	
	@Inject
	private TempAbsHistRepository temporaryAbsenceHistRepository;
	
	@Inject
	private TempAbsHistoryService tempAbsHistoryService;
	
	@Override
	public String targetCategoryCd() {
		return "CS00018";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteTemporaryAbsenceCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteTemporaryAbsenceCommand> context) {
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		
		Optional<TempAbsenceHistory> existHist = temporaryAbsenceHistRepository.getByEmployeeId(companyId,command.getEmployeeId());
		
		if (!existHist.isPresent()){
			throw new RuntimeException("invalid TempAbsenceHistory"); 
		}
		Optional<DateHistoryItem> itemToBeDelete = existHist.get().getDateHistoryItems().stream()
                .filter(h -> h.identifier().equals(command.getHistoyId()))
                .findFirst();
		
		if (!itemToBeDelete.isPresent()){
			throw new RuntimeException("invalid TempAbsenceHistory");
		}
		existHist.get().remove(itemToBeDelete.get());
		tempAbsHistoryService.delete(existHist.get(),itemToBeDelete.get());
		
		temporaryAbsenceRepository.delete(command.getHistoyId());
	}

}
