package nts.uk.ctx.bs.employee.dom.jobtitle.affiliate;

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
public class AffJobTitleHistoryService {
	@Inject
	private AffJobTitleHistoryRepository affJobTitleHistoryRepository;
	
	/**
	 * ドメインモデル「職務職位」を新規登録する
	 * 
	 * @param domain
	 */
	public void add(AffJobTitleHistory domain){
		if (domain.getHistoryItems().isEmpty()) {
			return;
		}
		DateHistoryItem itemToBeAdded = domain.getHistoryItems().get(domain.getHistoryItems().size() - 1);
		affJobTitleHistoryRepository.add(domain.getCompanyId(), domain.getEmployeeId(), itemToBeAdded);
		// Update item before
		updateItemBefore(domain, itemToBeAdded);
	}
	
	/**
	 * ドメインモデル「職務職位」を新規登録する
	 * 
	 * @param domain
	 */
	public void addAll(List<AffJobTitleHistory> domains){
		Map<String, DateHistoryItem> itemsMap = new HashMap<>();
		List<AffJobTitleHistoryImmediately> immedidately = new ArrayList<>();
		domains.stream().forEach(c ->{
			if (c.getHistoryItems().isEmpty()) {
				return;
			}	
			DateHistoryItem itemToBeAdded = c.getHistoryItems().get(c.getHistoryItems().size() - 1);
			itemsMap.put(c.getEmployeeId(), itemToBeAdded);
			immedidately.add(new AffJobTitleHistoryImmediately( c, itemToBeAdded));
			
		});
		
		if(itemsMap.size() > 0) {
			affJobTitleHistoryRepository.addAll(itemsMap);
		}
		// Update item before
		updateAllItemBefore(immedidately);
	}

	/**
	 * 取得した「職務職位」を更新する
	 * 
	 * @param domain
	 */
	public void update(AffJobTitleHistory domain, DateHistoryItem item){
		affJobTitleHistoryRepository.update(item);
		// Update item before
		updateItemBefore(domain, item);
	}
	
	/**
	 * 取得した「職務職位」を更新する
	 * 
	 * @param domain
	 */
	public void updateAll(List<AffJobTitleHistoryImmediately> immedidately){
		affJobTitleHistoryRepository.updateAll(immedidately.stream().map(c -> c.getItem()).collect(Collectors.toList()));
		// Update item before
		updateAllItemBefore(immedidately);
	}

	/**
	 * ドメインモデル「職務職位」を削除する
	 * 
	 * @param jobTitleMainId
	 */
	public void delete(AffJobTitleHistory domain, DateHistoryItem item){
		affJobTitleHistoryRepository.delete(item.identifier());
		if (domain.getHistoryItems().size() > 0) {
			DateHistoryItem itemToBeUpdated = domain.getHistoryItems().get(domain.getHistoryItems().size() - 1);
			affJobTitleHistoryRepository.update(itemToBeUpdated);
		}

	}
	/**
	 * Update item before
	 * @param domain
	 * @param item
	 */
	private void updateItemBefore(AffJobTitleHistory domain, DateHistoryItem item){
		Optional<DateHistoryItem> itemToBeUpdated = domain.immediatelyBefore(item);
		if (!itemToBeUpdated.isPresent()){
			return;
		}
		affJobTitleHistoryRepository.update(itemToBeUpdated.get());
	}
	
	/**
	 * Update item before
	 * @param domain
	 * @param item
	 */
	private void updateAllItemBefore(List<AffJobTitleHistoryImmediately> immedidately){
		List<DateHistoryItem> items = new ArrayList<>();
		immedidately.stream().forEach(c ->{
			Optional<DateHistoryItem> itemToBeUpdated = c.getDomain().immediatelyBefore(c.getItem());
			if (itemToBeUpdated.isPresent()){
				items.add(itemToBeUpdated.get());
			}
		});
		if(!items.isEmpty()) {
			affJobTitleHistoryRepository.updateAll(items);
		}
		
	}

}
