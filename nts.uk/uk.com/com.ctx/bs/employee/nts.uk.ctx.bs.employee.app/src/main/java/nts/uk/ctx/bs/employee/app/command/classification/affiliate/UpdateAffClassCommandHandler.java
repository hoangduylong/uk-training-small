/**
 * 
 */
package nts.uk.ctx.bs.employee.app.command.classification.affiliate;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItem;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItemRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistory;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepositoryService;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;
/**
 * @author danpv
 * @author hop.nt
 *
 */
@Stateless
public class UpdateAffClassCommandHandler extends CommandHandler<UpdateAffClassificationCommand>
		implements PeregUpdateCommandHandler<UpdateAffClassificationCommand> {

	@Inject
	private AffClassHistoryRepository affClassHistoryRepo;

	@Inject
	private AffClassHistItemRepository affClassHistItemRepo;
	
	@Inject
	private AffClassHistoryRepositoryService affClassHistoryRepositoryService;

//	@Inject
//	private ItemDefFinder itemDefFinder;
	
	@Override
	public String targetCategoryCd() {
		return "CS00004";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateAffClassificationCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateAffClassificationCommand> context) {
		UpdateAffClassificationCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		// In case of date period are exist in the screen
		if (command.getStartDate() != null){
			// update history
			Optional<AffClassHistory> historyOption = affClassHistoryRepo.getByEmployeeId(companyId, command.getEmployeeId());
			if (!historyOption.isPresent()) {
				throw new RuntimeException("invalid AffClassHistory");
			}
	
			Optional<DateHistoryItem> itemToBeUpdateOpt = historyOption.get().getPeriods().stream()
					.filter(h -> h.identifier().equals(command.getHistoryId())).findFirst();
			if (!itemToBeUpdateOpt.isPresent()) {
				throw new RuntimeException("invalid AffClassHistory");
			}
	
			historyOption.get().changeSpan(itemToBeUpdateOpt.get(),
					new DatePeriod(command.getStartDate(), command.getEndDate()!= null? command.getEndDate():  ConstantUtils.maxDate()));
			affClassHistoryRepositoryService.update(historyOption.get(), itemToBeUpdateOpt.get());
		}
		// update history item
		AffClassHistItem historyItem = AffClassHistItem.createFromJavaType(command.getEmployeeId(),
				command.getHistoryId(), command.getClassificationCode());
		affClassHistItemRepo.update(historyItem);

	}

}
