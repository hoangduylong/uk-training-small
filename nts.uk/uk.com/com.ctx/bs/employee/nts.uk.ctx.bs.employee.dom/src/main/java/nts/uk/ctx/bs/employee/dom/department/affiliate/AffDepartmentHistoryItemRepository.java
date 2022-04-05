package nts.uk.ctx.bs.employee.dom.department.affiliate;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface AffDepartmentHistoryItemRepository {
	
	Optional<AffDepartmentHistoryItem> getByHistId(String historyId);
	
	/**
	 * ドメインモデル「所属部門」を新規登録する
	 * @param domain
	 */
	void add(AffDepartmentHistoryItem domain);
	/**
	 * 取得した「所属部門」を更新する
	 * @param domain
	 */
	void update(AffDepartmentHistoryItem domain);
	/**
	 * ドメインモデル「所属部門（兼務）」を削除する
	 * @param domain
	 */
	void delete(String histId);
	
	/**
	 * 社員と基準日から所属部門履歴項目を取得する
	 * @param employeeID
	 * @param date
	 * @return
	 */
	Optional<AffDepartmentHistoryItem> findByEmpDate(String employeeID, GeneralDate date);
	
	/** 部門と基準日から所属部門履歴項目を取得する */
	List<AffDepartmentHistoryItem> getAffDepartmentHistoryItems(List<String> departmentIDs, GeneralDate baseDate);
}
