package nts.uk.ctx.bs.employee.app.command.employment.history;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistory;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryIntermediate;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryService;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregUpdateListCommandHandler;
@Stateless
public class UpdateEmploymentHistoryListCommandHandler extends CommandHandlerWithResult<List<UpdateEmploymentHistoryCommand>, List<MyCustomizeException>>
implements PeregUpdateListCommandHandler<UpdateEmploymentHistoryCommand>{

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
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<UpdateEmploymentHistoryCommand>> context) {
		List<UpdateEmploymentHistoryCommand> command = context.getCommand();
		String cid = AppContexts.user().companyId();
		List<String> sidErrorLst = new ArrayList<>();
		List<MyCustomizeException> errorExceptionLst = new ArrayList<>();
		// sidsPidsMap
		List<String> sids = command.stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
		List<EmploymentHistoryIntermediate> domainIntermediates = new ArrayList<>();
		List<EmploymentHistoryItem> employmentHistoryItems = new ArrayList<>();
			Map<String, List<EmploymentHistory>> existHistMap = employmentHistoryRepository.getAllByCidAndSids(cid, sids).stream().collect(Collectors.groupingBy(c -> c.getEmployeeId()));
		command.stream().forEach(c -> {
			try {
				// In case of date period are exist in the screen,
				if (c.getStartDate() != null) {
					List<EmploymentHistory> existHistLst = existHistMap.get(c.getEmployeeId());
					if (existHistLst != null) {
						Optional<DateHistoryItem> itemToBeUpdate = existHistLst.get(0).getHistoryItems().stream()
								.filter(h -> h.identifier().equals(c.getHistoryId())).findFirst();
						if (itemToBeUpdate.isPresent()) {
							existHistLst.get(0).changeSpan(itemToBeUpdate.get(), new DatePeriod(c.getStartDate(),
									c.getEndDate() != null ? c.getEndDate() : ConstantUtils.maxDate()));
							domainIntermediates
									.add(new EmploymentHistoryIntermediate(existHistLst.get(0), itemToBeUpdate.get()));
						} else {
							sidErrorLst.add(c.getEmployeeId());
							return;
						}
					} else {
						sidErrorLst.add(c.getEmployeeId());
						return;
					}
				}

				// Update detail table
				EmploymentHistoryItem histItem = EmploymentHistoryItem.createFromJavaType(c.getHistoryId(),
						c.getEmployeeId(), c.getEmploymentCode(),
						c.getSalarySegment() != null ? c.getSalarySegment().intValue() : null);
				employmentHistoryItems.add(histItem);
			} catch (BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getEmployeeId()), "期間");
				errorExceptionLst.add(ex);
			}

		});
		
		if(!domainIntermediates.isEmpty()) {
			employmentHistoryService.updateAll(domainIntermediates);
		}
		
		if(!employmentHistoryItems.isEmpty()) {
			employmentHistoryItemRepository.updateAll(employmentHistoryItems);
		}
		
		if(!sidErrorLst.isEmpty()) {
			errorExceptionLst.add(new MyCustomizeException("invalid employmentHistory", sidErrorLst));
		}
		return errorExceptionLst;
	}

}
