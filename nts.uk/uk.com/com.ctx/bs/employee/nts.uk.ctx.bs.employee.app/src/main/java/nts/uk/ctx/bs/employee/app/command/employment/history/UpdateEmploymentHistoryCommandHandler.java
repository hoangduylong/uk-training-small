package nts.uk.ctx.bs.employee.app.command.employment.history;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistory;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryService;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateEmploymentHistoryCommandHandler extends CommandHandler<UpdateEmploymentHistoryCommand>
		implements PeregUpdateCommandHandler<UpdateEmploymentHistoryCommand> {

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
		return UpdateEmploymentHistoryCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateEmploymentHistoryCommand> context) {
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		// In case of date period are exist in the screen
		if (command.getStartDate() != null){
			Optional<EmploymentHistory> existHist = employmentHistoryRepository.getByEmployeeId(companyId,command.getEmployeeId());
			if (!existHist.isPresent()) {
				throw new RuntimeException("invalid employmentHistory");
			}
	
			Optional<DateHistoryItem> itemToBeUpdate = existHist.get().getHistoryItems().stream()
					.filter(h -> h.identifier().equals(command.getHistoryId())).findFirst();
	
			if (!itemToBeUpdate.isPresent()) {
				throw new RuntimeException("invalid employmentHistory");
			}
			existHist.get().changeSpan(itemToBeUpdate.get(), new DatePeriod(command.getStartDate(), command.getEndDate()!= null? command.getEndDate():  ConstantUtils.maxDate()));
			employmentHistoryService.update(existHist.get(), itemToBeUpdate.get());
		}
		// Update detail table
		EmploymentHistoryItem histItem = EmploymentHistoryItem.createFromJavaType(command.getHistoryId(),
				command.getEmployeeId(), command.getEmploymentCode(),
				command.getSalarySegment() != null ? command.getSalarySegment().intValue() : null);
		employmentHistoryItemRepository.update(histItem);
	}

}
