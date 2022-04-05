package nts.uk.ctx.bs.employee.dom.temporaryabsence;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.shr.com.history.DateHistoryItem;

@Stateless
public class TempAbsHistoryService {
	@Inject
	private TempAbsHistRepository temporaryAbsenceHistRepository;
	
	/**
	 * ドメインモデル「休職休業」を新規登録する
	 * @param domain
	 */
	public void add(TempAbsenceHistory domain){
		if (domain.getDateHistoryItems().isEmpty()) {
			return;
		}
		// Insert last element
		DateHistoryItem lastItem = domain.getDateHistoryItems().get(domain.getDateHistoryItems().size() - 1);
		temporaryAbsenceHistRepository.add(domain.getCompanyId(), domain.getEmployeeId(), lastItem);
	}
	
	/**
	 * ドメインモデル「休職休業」を新規登録する
	 * @param domain
	 */
	public void addAll(List<TempAbsenceHistory> domains){
		Map<String, DateHistoryItem> dateHistItem = new HashMap<>();
		domains.stream().forEach(c ->{
			if (c.getDateHistoryItems().isEmpty()) {
				return;
			}	
			
			// Insert last element
			DateHistoryItem lastItem = c.getDateHistoryItems().get(c.getDateHistoryItems().size() - 1);
			dateHistItem.put(c.getEmployeeId(), lastItem);
		});
		if(!dateHistItem.isEmpty()) {
			temporaryAbsenceHistRepository.addAll(dateHistItem);
		}
		
	}
	/**
	 * 取得した「休職休業」を更新する
	 * @param domain
	 */
	public void update(TempAbsenceHistory domain, DateHistoryItem item){
		temporaryAbsenceHistRepository.update(item);
	}
	
	/**
	 * 取得した「休職休業」を更新する
	 * @param domain
	 */
	public void updateAll(List<DateHistoryItem> items){
		temporaryAbsenceHistRepository.updateAll(items);
	}
	
	/**
	 * ドメインモデル「休職休業」を削除する
	 * @param domain
	 */
	public void delete(TempAbsenceHistory domain, DateHistoryItem item){
		temporaryAbsenceHistRepository.delete(item.identifier());
	}
	
}
