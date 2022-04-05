package nts.uk.ctx.bs.employee.dom.classification.affiliate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.shr.com.history.DateHistoryItem;

/**
 * 
 * @author hop.nt
 *
 */
@Stateless
public class AffClassHistoryRepositoryService {
	
	@Inject
	private AffClassHistoryRepository affClassHistoryRepo;
	/**
	 * add domain history
	 * add last item and update before items
	 * @param history
	 */
	public void add(AffClassHistory history){
		if (history.getPeriods().isEmpty()) {
			return;
		}
		List<DateHistoryItem> periods = history.getPeriods();
		DateHistoryItem historyItem = periods.get(periods.size() - 1);
		affClassHistoryRepo.add(history.getCompanyId(), history.getEmployeeId(), historyItem);

		updateItemBefore(history, historyItem);
	}
	
	/**
	 * update domain history
	 * update item and nearly item
	 * @param history
	 */
	public void update(AffClassHistory history, DateHistoryItem item){
		affClassHistoryRepo.update(item);
		// Update item before and after
		updateItemBefore(history, item);
	}
	
	/**
	 * delete domain history
	 * delete last item and update nearly item
	 * @param history
	 * @param item
	 */
	public void delete(AffClassHistory history, DateHistoryItem item){
		affClassHistoryRepo.delete(item.identifier());
		
		if (!history.getPeriods().isEmpty()) {
			DateHistoryItem lastItem = history.getPeriods().get(history.getPeriods().size() - 1);
			affClassHistoryRepo.update(lastItem);
		}
	}
	
	private void updateItemBefore(AffClassHistory history, DateHistoryItem item) {
		// Update item before
		Optional<DateHistoryItem> beforeItemOpt = history.immediatelyBefore(item);

		if (!beforeItemOpt.isPresent()) {
			return;
		}
		affClassHistoryRepo.update(beforeItemOpt.get());

	}

	/**
	 * @author lanlt
	 * add list domain history - cps003
	 * add last item and update before items
	 * @param history
	 */
	public void addAll(List<AffClassHistory> history){
		List<AffClassHistory> historiesInsertLst = new ArrayList<>();
		history.stream().forEach(c ->{
			if (c.getPeriods().isEmpty()) {
				return;
			}
			List<DateHistoryItem> periods = c.getPeriods();
			DateHistoryItem historyItem = periods.get(periods.size() - 1);
			historiesInsertLst.add(new AffClassHistory(c.getCompanyId(), c.getEmployeeId(), Arrays.asList(historyItem)));
		});
		
		if (!historiesInsertLst.isEmpty()) {
			affClassHistoryRepo.addAll(historiesInsertLst);
			addAllItemBefore(history);
		}
	}
	
	/**
	 * @author lanlt
	 * updateAllItemBefore - cps003
	 * @param histories
	 */
	private void updateAllItemBefore(List<MidAffClass> midAffClass) {
		List<DateHistoryItem> dateHistItem = new ArrayList<>();
		// Update item before
		midAffClass.stream().forEach(c -> {
			Optional<DateHistoryItem> beforeItemOpt = c.getHistory().immediatelyBefore(c.getItem());
			if (!beforeItemOpt.isPresent()) {
				return;
			}
			dateHistItem.add(beforeItemOpt.get());
		});

		if (!dateHistItem.isEmpty()) {
			affClassHistoryRepo.updateAll(dateHistItem);
		}
	}
	
	/**
	 * update All domain history - cps003
	 * update All item and nearly item
	 * @param history
	 */
	public void updateAll(List<MidAffClass> midAffClass){
		List<DateHistoryItem> dateHistItems = midAffClass.stream().map(c -> c.getItem()).collect(Collectors.toList());
		affClassHistoryRepo.updateAll(dateHistItems);
		// Update item before and after
		if(!midAffClass.isEmpty()) {
			updateAllItemBefore(midAffClass);
		}
	}
	
	/**
	 * @author lanlt
	 * addAllItemBefore - cps003
	 * @param histories
	 */
	private void addAllItemBefore(List<AffClassHistory> histories) {
		List<DateHistoryItem> dateHistItem = new ArrayList<>();
		// Update item before
		histories.stream().forEach(c ->{
			List<DateHistoryItem> periods = c.getPeriods();
			DateHistoryItem historyItem = periods.get(periods.size() - 1);
			Optional<DateHistoryItem> beforeItemOpt = c.immediatelyBefore(historyItem);
			if (!beforeItemOpt.isPresent()) {
				return;
			}
			dateHistItem.add(beforeItemOpt.get());
				
		});
		if(!dateHistItem.isEmpty()) {
			affClassHistoryRepo.updateAll(dateHistItem);
		}
	}

}
