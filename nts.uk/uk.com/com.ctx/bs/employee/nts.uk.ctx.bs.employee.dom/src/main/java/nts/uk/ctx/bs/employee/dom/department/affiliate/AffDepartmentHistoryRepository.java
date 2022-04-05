package nts.uk.ctx.bs.employee.dom.department.affiliate;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;

public interface AffDepartmentHistoryRepository {
	/**
	 *  get AffDepartmentHistory by employeeId and standard date
	 *  
	 * @param employeeId
	 * @param historyId
	 * @param standardDate
	 * @return AffDepartmentHistory domain
	 */
	Optional<AffDepartmentHistory> getAffDeptHistByEmpHistStandDate(String employeeId, GeneralDate standardDate);
	
	/**
	 * get AffDepartmentHistory by history id
	 * @param historyId
	 * @return AffDepartmentHistory
	 */
	Optional<AffDepartmentHistory> getByHistId(String historyId);
	
	/**
	 * Get affiliation department history by employeeid
	 * @param employeeId
	 * @return
	 */
	Optional<AffDepartmentHistory> getByEmployeeId(String cid, String employeeId);
	
	/**
	 * Get affiliation department history by employeeid with descending
	 * @param employeeId
	 * @return
	 */
	Optional<AffDepartmentHistory> getByEmployeeIdDesc(String cid, String employeeId);
	
	/**
	 * ドメインモデル「所属部門」を新規登録する
	 * @param sid
	 * @param domain
	 */
	void add(String cid, String sid, DateHistoryItem domain);
	/**
	 * 取得した「所属部門」を更新する
	 * @param domain
	 */
	void update(DateHistoryItem domain);
	/**
	 *  ドメインモデル「所属部門（兼務）」を削除する
	 * @param histId
	 */
	void delete(String histId);
	
	List<Object[]> getAffDeptHistByEmpIdAndBaseDate(List<String> sids, GeneralDate baseDate);

}
