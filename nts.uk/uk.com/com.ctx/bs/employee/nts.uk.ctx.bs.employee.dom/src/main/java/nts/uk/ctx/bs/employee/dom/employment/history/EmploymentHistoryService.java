package nts.uk.ctx.bs.employee.dom.employment.history;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.shr.com.history.DateHistoryItem;

@Stateless
public class EmploymentHistoryService {
	@Inject
	private EmploymentHistoryRepository employmentHistoryRepository;
	
	/**
	 * Add employment history
	 * @param domain
	 */
	public void add(EmploymentHistory domain){
		if (domain.getHistoryItems().isEmpty()){
			return;
		}
		// Insert last element
		DateHistoryItem lastItem = domain.getHistoryItems().get(domain.getHistoryItems().size()-1);
		employmentHistoryRepository.add(domain.getEmployeeId(), lastItem);
		// Update item before and after
		updateItemBefore(domain,lastItem);
	}
	
	/**
	 * Add employment history - cps003
	 * @param domain
	 */
	public void addAll(List<EmploymentHistoryIntermediate> domains){
		Map<String, DateHistoryItem> employmentHistMap = new HashMap<>();
		domains.stream().forEach(c ->{
			EmploymentHistory domain = c.getDomain();
			if(domain.getHistoryItems().isEmpty()) {
				return;
			}
			// Insert last element
			DateHistoryItem lastItem = domain.getHistoryItems().get(domain.getHistoryItems().size()-1);
			employmentHistMap.put(domain.getEmployeeId(), lastItem);
		});

		employmentHistoryRepository.addAll(employmentHistMap);
		// Update item before and after
		updateItemBefore(domains);
	}
	
	/**
	 * Update employment history - cps003
	 * @param domain
	 * @param itemToBeUpdated
	 */
	public void update(EmploymentHistory domain, DateHistoryItem itemToBeUpdated){
		employmentHistoryRepository.update(itemToBeUpdated);
		// Update item before
		updateItemBefore(domain,itemToBeUpdated);
	}
	
	/**
	 * Update employment history
	 * @param domain
	 * @param itemToBeUpdated
	 */
	public void updateAll(List<EmploymentHistoryIntermediate> domains){
		List<DateHistoryItem> itemToBeUpdateds = domains.stream().map(c -> c.getItemToBeUpdated()).collect(Collectors.toList());
		employmentHistoryRepository.updateAll(itemToBeUpdateds);
		// Update item before
		updateItemBefore(domains);
	}
	/**
	 * Delete employment history
	 * @param domain
	 * @param itemToBeDeleted
	 */
	public void delete(EmploymentHistory domain, DateHistoryItem itemToBeDeleted){
		employmentHistoryRepository.delete(itemToBeDeleted.identifier());
		
		// Update last item
		if (domain.getHistoryItems().size() >0){
			DateHistoryItem itemToBeUpdated = domain.getHistoryItems().get(domain.getHistoryItems().size()-1);
			employmentHistoryRepository.update(itemToBeUpdated);
		}
	}
	
	/**
	 * Update item before
	 * @param domain
	 * @param item
	 */
	private void updateItemBefore(EmploymentHistory domain, DateHistoryItem item){
		Optional<DateHistoryItem> itemToBeUpdated = domain.immediatelyBefore(item);
		if (!itemToBeUpdated.isPresent()){
			return;
		}
		employmentHistoryRepository.update(itemToBeUpdated.get());
	}
	
	/**
	 * Update all item before - cps003
	 * @param domain
	 * @param item
	 */
	private void updateItemBefore(List<EmploymentHistoryIntermediate> domains){
		List<DateHistoryItem> itemToBeUpdatedLst = new ArrayList<>();
		domains.stream().forEach(c ->{
			Optional<DateHistoryItem> itemToBeUpdated = c.getDomain().immediatelyBefore(c.getItemToBeUpdated());
			if(itemToBeUpdated.isPresent()) {
				itemToBeUpdatedLst.add(itemToBeUpdated.get());
			}
		});
		if(!itemToBeUpdatedLst.isEmpty()) {
			employmentHistoryRepository.updateAll(itemToBeUpdatedLst);
		}
	}

}
