/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.temporaryabsence;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface TempAbsItemRepository {

	// ------------------------------GET HISTORY ITEM
	/**
	 * get TempAbsenceHisItem by history Id
	 * 
	 * @param historyId
	 * @return
	 */
	Optional<TempAbsenceHisItem> getItemByHitoryID(String historyId);
	
	
	/**
	 * get by a list of history id
	 * @param historyIds
	 * @return
	 */
	List<TempAbsenceHisItem> getItemByHitoryIdList(List<String> historyIds);
	
	/**
	 * get with employeeId and standardDate
	 * @param employeeId
	 * @param standardDate
	 * @return
	 */
	Optional<TempAbsenceHisItem> getByEmpIdAndStandardDate(String employeeId, GeneralDate standardDate);
	
	/**
	 * Gets the by emp ids and standard date.
	 *
	 * @param employeeIds the employee ids
	 * @param standardDate the standard date
	 * @return the by emp ids and standard date
	 */
	List<TempAbsenceHisItem> getByEmpIdsAndStandardDate(List<String> employeeIds, GeneralDate standardDate);

	// ------------------------------ COMMAND HISTORY ITEM
	/**
	 * ドメインモデル「休職休業」を新規登録する
	 * 
	 * @param domain
	 */
	void add(TempAbsenceHisItem domain);
	
	/**
	 * @author lanlt
	 * ドメインモデル「休職休業」を新規登録する
	 * 
	 * @param domain
	 */
	void addAll(List<TempAbsenceHisItem> domains);

	/**
	 * 取得した「休職休業」を更新する
	 * 
	 * @param domain
	 */
	void update(TempAbsenceHisItem domain);

	/**
	 * @author lanlt
	 * 取得した「休職休業」を更新する
	 * 
	 * @param domain
	 */
	void updateAll(List<TempAbsenceHisItem> domains);
	/**
	 * ドメインモデル「休職休業」を削除する
	 * 
	 * @param domain
	 */
	void delete(String histId);

}
