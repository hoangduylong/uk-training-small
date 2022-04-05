package nts.uk.ctx.bs.employee.app.command.classification.affiliate;

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
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItem;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItemRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistory;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepositoryService;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregAddListCommandHandler;
/**
 * 
 * @author lanlt
 *
 */
@Stateless
public class AddAffClassListCommandHandler extends CommandHandlerWithResult<List<AddAffClassificationCommand>, List<MyCustomizeException>>
implements PeregAddListCommandHandler<AddAffClassificationCommand>{
	@Inject
	private AffClassHistoryRepository affClassHistoryRepo;

	@Inject
	private AffClassHistItemRepository affClassHistItemRepo;

	@Inject
	private AffClassHistoryRepositoryService affClassHistoryRepositoryService;
	@Override
	public String targetCategoryCd() {
		return "CS00004";
	}

	@Override
	public Class<?> commandClass() {
		return AddAffClassificationCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<AddAffClassificationCommand>> context) {
		List<AddAffClassificationCommand> command = context.getCommand();
		String cid = AppContexts.user().companyId();
		List<MyCustomizeException> result = new ArrayList<>();
		List<AffClassHistItem> histItemDomains = new ArrayList<>();
		List<AffClassHistory> affClassHistDomains = new ArrayList<>();
		Map<String, String> recordIds = new HashMap<>();
		List<String> sids = command.stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
		
		Map<String, List<AffClassHistory>> historiesMap = affClassHistoryRepo.getBySidsWithCid(cid, sids).stream().collect(Collectors.groupingBy(c -> c.getEmployeeId()));
		
		command.stream().forEach(c ->{
			try {
			// add history
			String newHistoryId = IdentifierUtil.randomUniqueId();
			AffClassHistory history = new AffClassHistory(cid, c.getEmployeeId(), new ArrayList<>());
			if(historiesMap.containsKey(c.getEmployeeId())) {
				List<AffClassHistory> affClassHistLst = historiesMap.get(c.getEmployeeId());
				if(affClassHistLst.size() > 0) {
					history = affClassHistLst.get(0);
				}
				
			}
			DateHistoryItem dateItem = new DateHistoryItem(newHistoryId, new DatePeriod(c.getStartDate() != null ? c.getStartDate() : ConstantUtils.minDate(), c.getEndDate()!= null? c.getEndDate():  ConstantUtils.maxDate()));
			history.add(dateItem);
			affClassHistDomains.add(history);
			// add history item
			AffClassHistItem histItem = AffClassHistItem.createFromJavaType(c.getEmployeeId(), newHistoryId,
					c.getClassificationCode());
			histItemDomains.add(histItem);
			recordIds.put(c.getEmployeeId(), newHistoryId);
			
			}catch(BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getEmployeeId()), "期間");
				result.add(ex);
			}
		});
		if(!affClassHistDomains.isEmpty()) {
			affClassHistoryRepositoryService.addAll(affClassHistDomains);
		}
		
		if(!histItemDomains.isEmpty()) {
			affClassHistItemRepo.addAll(histItemDomains);
		}
		
		if(!recordIds.isEmpty()) {
			result.add(new MyCustomizeException("NOERROR", recordIds));
		}
		return result;
	}

}
