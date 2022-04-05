package nts.uk.ctx.bs.employee.dom.workplace.affiliate;

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
public class AffWorkplaceHistoryService {

	@Inject
	private AffWorkplaceHistoryRepository affWorkplaceHistoryRepository;
	
	/**
	 * ドメインモデル「所属職場」を新規登録する
	 * @param domain
	 */
	public void add(AffWorkplaceHistory domain){
		if (domain.getHistoryItems().isEmpty()){
			return;
		}
		// Insert last element
		DateHistoryItem lastItem = domain.getHistoryItems().get(domain.getHistoryItems().size()-1);
		affWorkplaceHistoryRepository.add(domain.getCompanyId(), domain.getEmployeeId(), lastItem);
		
		// Update item before
		updateItemBefore(domain,lastItem);
	}
	
	/**
	 * ドメインモデル「所属職場」を新規登録する - cps003
	 * @param domain
	 */
	public void addAll(List<AffWorkplaceHistory> domains){
		Map<String, DateHistoryItem> historyItemsMap = new HashMap<>();
		List<AffWorkplaceHistoryIntermediate> intermediates = new ArrayList<>();
		domains.stream().forEach(c ->{
			if (c.getHistoryItems().isEmpty()){
				return;
			}
			// Insert last element
			DateHistoryItem lastItem = c.getHistoryItems().get(c.getHistoryItems().size()-1);
			historyItemsMap.put(c.getEmployeeId(), lastItem);
			intermediates.add(new AffWorkplaceHistoryIntermediate(c, lastItem));
		});

		if(!historyItemsMap.isEmpty()) {
			affWorkplaceHistoryRepository.addAll(historyItemsMap);
		}
		
		// Update item before
		if(!intermediates.isEmpty()) {
			updateAllItemBefore(intermediates);
		}
	}
	/**
	 * ドメインモデル「所属職場」を削除する
	 * @param domain
	 */
	public void delete(AffWorkplaceHistory domain, DateHistoryItem item){
		affWorkplaceHistoryRepository.delete(item.identifier());
		// Update last item
		if (domain.getHistoryItems().size() >0){
			DateHistoryItem lastItem = domain.getHistoryItems().get(domain.getHistoryItems().size()-1);
			affWorkplaceHistoryRepository.update(lastItem);
		}
	}
	
	/**
	 * ドメインモデル「所属職場」を取得する
	 * @param domain
	 */
	public void update(AffWorkplaceHistory domain, DateHistoryItem item){
		affWorkplaceHistoryRepository.update(item);
		// Update item before
		updateItemBefore(domain,item);
	}
	
	/**
	 * ドメインモデル「所属職場」を取得する - cps003
	 * @param domain
	 */
	public void updateAll(List<AffWorkplaceHistoryIntermediate> domains){
		List<DateHistoryItem> dateHistItems = domains.stream().map(c -> c.getItem()).collect(Collectors.toList());
		if(!dateHistItems.isEmpty()) {
			affWorkplaceHistoryRepository.updateAll(dateHistItems);
		}
		// Update item before
		updateAllItemBefore(domains);
	}
	
	/**
	 * Update item before
	 * @param domain
	 * @param item
	 */
	private void updateItemBefore(AffWorkplaceHistory domain, DateHistoryItem item){
		Optional<DateHistoryItem> itemToBeUpdated = domain.immediatelyBefore(item);
		if (!itemToBeUpdated.isPresent()){
			return;
		}
		affWorkplaceHistoryRepository.update(itemToBeUpdated.get());
	}
	
	
	/**
	 * Update all item before
	 * @param domain
	 * @param item
	 */
	private void updateAllItemBefore(List<AffWorkplaceHistoryIntermediate> domains){
		List<DateHistoryItem> dateHistItem = new ArrayList<>();
		domains.stream().forEach(c ->{
			Optional<DateHistoryItem> itemToBeUpdated = c.getDomain().immediatelyBefore(c.getItem());
			if (!itemToBeUpdated.isPresent()){
				return;
			}
			dateHistItem.add(itemToBeUpdated.get());
		});
		if(!dateHistItem.isEmpty()) {
			affWorkplaceHistoryRepository.updateAll(dateHistItem);
		}
	}

}
