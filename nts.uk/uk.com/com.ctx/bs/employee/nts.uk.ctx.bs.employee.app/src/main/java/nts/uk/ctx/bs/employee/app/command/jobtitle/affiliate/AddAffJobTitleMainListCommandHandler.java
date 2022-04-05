package nts.uk.ctx.bs.employee.app.command.jobtitle.affiliate;

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
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItem;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryService;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregAddListCommandHandler;
@Stateless
public class AddAffJobTitleMainListCommandHandler extends CommandHandlerWithResult<List<AddAffJobTitleMainCommand>, List<MyCustomizeException>>
implements PeregAddListCommandHandler<AddAffJobTitleMainCommand>{
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
		return AddAffJobTitleMainCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<AddAffJobTitleMainCommand>> context) {
		List<AddAffJobTitleMainCommand> command = context.getCommand();
		String cid = AppContexts.user().companyId();
		Map<String, String> recordIds = new HashMap<>();
		List<MyCustomizeException> result = new ArrayList<>();
		List<AffJobTitleHistoryItem> histItems = new ArrayList<>();
		List<AffJobTitleHistory> affJobTitleHistoryLst = new ArrayList<>();
		
		List<String> sids = command.stream().map(c -> c.getSid()).collect(Collectors.toList());
		Map<String, List<AffJobTitleHistory>> existHistMap = affJobTitleHistoryRepository.getListBySids(cid, sids)
				.stream().collect(Collectors.groupingBy(c -> c.getEmployeeId()));

		command.stream().forEach(c -> {
			try {
			String histId = IdentifierUtil.randomUniqueId();
			List<AffJobTitleHistory> affJobTitleHistory = existHistMap.get(c.getSid());
			AffJobTitleHistory itemtoBeAdded = new AffJobTitleHistory(cid, c.getSid(), new ArrayList<>());
			DateHistoryItem dateItem = new DateHistoryItem(histId,
					new DatePeriod(c.getStartDate() != null ? c.getStartDate() : ConstantUtils.minDate(),
							c.getEndDate() != null ? c.getEndDate() : ConstantUtils.maxDate()));
			if (affJobTitleHistory != null) {
				itemtoBeAdded = affJobTitleHistory.get(0);
			}
			itemtoBeAdded.add(dateItem);
			affJobTitleHistoryLst.add(itemtoBeAdded);
			AffJobTitleHistoryItem histItem = AffJobTitleHistoryItem.createFromJavaType(histId, c.getSid(),
					c.getJobTitleId(), c.getNote());
			histItems.add(histItem);
			recordIds.put(c.getSid(), histId);
			
			} catch(BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getSid()), "期間");
				result.add(ex);
			}
		});
		if (!affJobTitleHistoryLst.isEmpty()) {
			affJobTitleHistoryService.addAll(affJobTitleHistoryLst);
		}
		if (!histItems.isEmpty()) {
			affJobTitleHistoryItemRepository.addAll(histItems);
		}
		
		if(!recordIds.isEmpty()) {
			result.add(new MyCustomizeException("NOERROR", recordIds));
		}

		return result;
	}

}
