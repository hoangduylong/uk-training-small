package nts.uk.ctx.bs.employee.dom.department.affiliate;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.shr.com.history.DateHistoryItem;

@Stateless
public class AffDepartmentHistoryService {
	@Inject
	private AffDepartmentHistoryRepository affDepartmentHistoryRepository;
	
	/**
	 * ドメインモデル「所属部門」を新規登録する
	 * @param domain
	 */
	public void add(AffDepartmentHistory domain){
		DateHistoryItem itemToBeAdded = domain.getHistoryItems().get(domain.getHistoryItems().size()-1);
		affDepartmentHistoryRepository.add(domain.getCompanyId(), domain.getEmployeeId(), itemToBeAdded);
		// Update item before
		updateItemBefore(domain,itemToBeAdded);
	}
	/**
	 * 取得した「所属部門」を更新する
	 * @param domain
	 */
	public void update(AffDepartmentHistory domain, DateHistoryItem item){
		affDepartmentHistoryRepository.update(item);
		// Update item before and after
		updateItemBefore(domain,item);
		updateItemAfter(domain,item);
	}
	/**
	 * ドメインモデル「所属部門（兼務）」を削除する
	 * @param domain
	 */
	public void delete(AffDepartmentHistory domain, DateHistoryItem item){
		affDepartmentHistoryRepository.delete(item.identifier());
		//Update last item
		if (domain.getHistoryItems().size() >0){
			DateHistoryItem itemToBeUpdated = domain.getHistoryItems().get(domain.getHistoryItems().size()-1);
			affDepartmentHistoryRepository.update(itemToBeUpdated);
		}
	}
	/**
	 * Update item before
	 * @param domain
	 * @param item
	 */
	private void updateItemBefore(AffDepartmentHistory domain, DateHistoryItem item){
		Optional<DateHistoryItem> itemToBeUpdated = domain.immediatelyBefore(item);
		if (!itemToBeUpdated.isPresent()){
			return;
		}
		affDepartmentHistoryRepository.update(itemToBeUpdated.get());
	}
	/**
	 * Update item after
	 * @param domain
	 * @param item
	 */
	private void updateItemAfter(AffDepartmentHistory domain, DateHistoryItem item){
		Optional<DateHistoryItem> itemToBeUpdated = domain.immediatelyAfter(item);
		if (!itemToBeUpdated.isPresent()){
			return;
		}
		affDepartmentHistoryRepository.update(itemToBeUpdated.get());
	}
}
