package nts.uk.ctx.bs.employee.app.command.department;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistory;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryItem;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryRepository;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryService;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateAffiliationDepartmentCommandHandler extends CommandHandler<UpdateAffiliationDepartmentCommand>
	implements PeregUpdateCommandHandler<UpdateAffiliationDepartmentCommand>{

	@Inject
	private AffDepartmentHistoryRepository affDepartmentHistoryRepository;
	
	@Inject
	private AffDepartmentHistoryItemRepository affDepartmentHistoryItemRepository;
	
	@Inject
	private AffDepartmentHistoryService affDepartmentHistoryService;
	
	@Override
	public String targetCategoryCd() {
		return "CS00015";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateAffiliationDepartmentCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateAffiliationDepartmentCommand> context) {
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		Optional<AffDepartmentHistory> itemHist = affDepartmentHistoryRepository.getByEmployeeId(companyId, command.getEmployeeId());
		if (!itemHist.isPresent()){
			throw new RuntimeException("Invalid AffDepartmentHistory");
		}
		Optional<DateHistoryItem> itemToBeChanged = itemHist.get().getHistoryItems().stream()
				.filter(d->d.identifier().equals(command.getHistoryId())).findFirst();
		
		if (!itemToBeChanged.isPresent()){
			throw new RuntimeException("Invalid AffDepartmentHistory");
		}
		
		itemHist.get().changeSpan(itemToBeChanged.get(), new DatePeriod(command.getStartDate(), command.getEndDate()!= null? command.getEndDate(): ConstantUtils.maxDate()));
		
		affDepartmentHistoryService.update(itemHist.get(), itemToBeChanged.get());
		
		
		AffDepartmentHistoryItem histItem = AffDepartmentHistoryItem.createFromJavaType(command.getHistoryId(), command.getEmployeeId(), command.getDepartmentId(), command.getAffHistoryTranfsType(), command.getDistributionRatio());
		affDepartmentHistoryItemRepository.update(histItem);
		
		
	}

}
