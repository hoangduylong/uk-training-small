package nts.uk.ctx.bs.employee.app.command.employment.history;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
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
import nts.uk.shr.pereg.app.command.PeregAddListCommandHandler;
@Stateless
public class AddEmploymentHistoryListCommandHandler extends CommandHandlerWithResult<List<AddEmploymentHistoryCommand>, List<MyCustomizeException>>
implements PeregAddListCommandHandler<AddEmploymentHistoryCommand>{
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
		return AddEmploymentHistoryCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<AddEmploymentHistoryCommand>> context) {
		List<AddEmploymentHistoryCommand> command = context.getCommand();
		String cid = AppContexts.user().companyId();
		Map<String, String> recordIds = new HashMap<>();
		List<MyCustomizeException> result = new ArrayList<>();
		List<EmploymentHistoryIntermediate> domains = new ArrayList<>();
		List<EmploymentHistoryItem> employmentHistoryItems = new ArrayList<>();
		List<String> sids = command.stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
		Map<String, List<EmploymentHistory>> histBySidsMap = employmentHistoryRepository.getAllByCidAndSids(cid, sids)
				.stream().collect(Collectors.groupingBy(c -> c.getEmployeeId()));
		
		command.stream().forEach(c -> {
			try {
				
				String newHistID = IdentifierUtil.randomUniqueId();
				DateHistoryItem dateItem = new DateHistoryItem(newHistID,
						new DatePeriod(c.getStartDate() != null ? c.getStartDate() : ConstantUtils.minDate(),
								c.getEndDate() != null ? c.getEndDate() : ConstantUtils.maxDate()));
				List<EmploymentHistory> histBySidLst = histBySidsMap.get(c.getEmployeeId());
				EmploymentHistory itemtoBeAdded = new EmploymentHistory(cid, c.getEmployeeId(), new ArrayList<>());
				if (histBySidLst != null) {
					itemtoBeAdded = histBySidLst.get(0);
				}
				itemtoBeAdded.add(dateItem);
				// phải set Segment mặc định là 1 vì Enum value từ 1-> 4
				EmploymentHistoryItem histItem = EmploymentHistoryItem.createFromJavaType(newHistID, c.getEmployeeId(),
						c.getEmploymentCode(), c.getSalarySegment() != null ? c.getSalarySegment().intValue() : null);
				domains.add(new EmploymentHistoryIntermediate(itemtoBeAdded, dateItem));
				employmentHistoryItems.add(histItem);
				recordIds.put(c.getEmployeeId(), newHistID);
				
			}catch(BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getEmployeeId()),"期間");
				result.add(ex);
			}

			
		});
		if (!domains.isEmpty()) {
			employmentHistoryService.addAll(domains);
		}

		if (!employmentHistoryItems.isEmpty()) {
			employmentHistoryItemRepository.addAll(employmentHistoryItems);
		}
		
		if(!recordIds.isEmpty()) {
			result.add(new MyCustomizeException("NOERROR", recordIds));
		}

		return result;
	}

}
