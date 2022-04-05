package nts.uk.ctx.bs.employee.dom.temporaryabsence;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * @author danpv
 *
 */
public interface TempAbsHistRepository {

	// -----------------------------GET HISTORY ----------------------------------
	/**
	 * Get TemporaryAbsenceHist by employeeId
	 * @param employeeId
	 * @param histId
	 * @return
	 */
	Optional<TempAbsenceHistory> getByEmployeeId(String cid, String employeeId);
	
	/**
	 * Get TemporaryAbsenceHist by employeeId
	 * @param employeeId
	 * @param histId
	 * @return
	 */
	Optional<TempAbsenceHistory> getByEmployeeIdDesc(String cid, String employeeId);
	
	/**
	 * Get TemporaryAbsenceHist by histId
	 * @param employeeId
	 * @param histId
	 * @return
	 */
	Optional<DateHistoryItem> getByHistId( String histId);
	
	/**
	 * get a TemporaryAbsenceHist with employeeId and standard date
	 * @param employeeId
	 * @param referenceDate
	 * @return
	 */
	Optional<DateHistoryItem> getItemByEmpIdAndStandardDate(String employeeId, GeneralDate standardDate);
	
	/**
	 * Get list TempAbsenceHistory by lstSid and dateperiod
	 * @param employeeIds
	 * @param datePeriod
	 * @return
	 */
	List<TempAbsenceHistory> getByListSid(List<String> employeeIds , DatePeriod datePeriod);
	
	/**
	 * Get list sid by lstSid and dateperiod
	 * @param employeeIds
	 * @param datePeriod
	 * @return
	 */
	List<String> getLstSidByListSidAndDatePeriod(List<String> employeeIds , DatePeriod datePeriod);
	/**
	 * Get list sid by lstSid and dateperiod
	 * @param employeeIds
	 * @param datePeriod
	 * @return
	 */
	List<String> getByListSid(List<String> employeeIds);
	// ------------------------------ COMMAND HISTORY---------------------------------
	/**
	 * ドメインモデル「休職休業」を新規登録する
	 * @param item
	 * @param sid
	 */
	void add(String cid, String sid, DateHistoryItem item);
	
	/**
	 * @author lanlt
	 * ドメインモデル「休職休業」を新規登録する
	 * @param item
	 * @param sid
	 */
	void addAll(Map<String, DateHistoryItem>  dateHistItemsMap);
	/**
	 * 取得した「休職休業」を更新する
	 * @param domain
	 */
	void update(DateHistoryItem domain);
	
	/**
	 * @author lanlt
	 * 取得した「休職休業」を更新する
	 * @param domain
	 */
	void updateAll(List<DateHistoryItem> domain);
	
	/**
	 * ドメインモデル「休職休業」を削除する
	 * @param histId
	 */
	void delete(String histId);
	
	/**
	 * Get TemporaryAbsenceHist by employeeId
	 * @param employeeId
	 * @param histId
	 * @return
	 */
	Optional<TempAbsenceHistory> getBySidAndLeave(String cid, String employeeId);
	
	/**
	 * dùng cho màn cps003, mục đích fix response
	 * Get TemporaryAbsenceHist by cid, sids, standardDate
	 * @param cid
	 * @param sids
	 * @param standardDate
	 * @return
	 */
	List<DateHistoryItem> getAllBySidAndCidAndBaseDate(String cid, List<String> sids, GeneralDate standardDate);

	/**
	 * @author lanlt
	 * @param cid
	 * @param employeeIds
	 * @return
	 */
	List<TempAbsenceHistory> getBySidsAndCid(String cid, List<String> employeeIds);
    
	// get data cps013
	List<DateHistoryItem> getListByListSidsNoWithPeriod(String cid, List<String> sids);
	
	List<TempAbsenceHistory> getHistoryBySidAndCidAndBaseDate(String cid, List<String> sids, GeneralDate standardDate);
	
	/** [0] insert ( 休職休業履歴, 休職休業履歴項目 ) **/
	void insert (TempAbsenceHistory tempAbsenceHistory ,TempAbsenceHisItem tempAbsenceHisItem);
	/** [1] update ( 休職休業履歴, 休職休業履歴項目 )**/
	void update (TempAbsenceHistory tempAbsenceHistory ,TempAbsenceHisItem tempAbsenceHisItem);
	/** [2-1] delete ( 会社ID, 社員ID, 履歴ID )**/
	void delete(String companyID , String empID , String historyID);
	/** [2-2] delete ( 会社ID, 社員ID )	**/
	void delete(String companyID , String empID );
	/** [3-1] 社員IDを指定して履歴を取得する ( 会社ID, 社員ID )**/
	Optional<TempAbsenceHistory> specifyEmpIDGetHistory(String companyID , String employeeId);
	/**[3-2] *社員IDを指定して履歴を取得する ( 会社ID, List<社員ID> )**/
	List<TempAbsenceHistory> getHistoryByListEmp(String companyId , List<String> lstEmpId);
	/** [4] 履歴IDを指定して履歴項目を取得する**/
	Optional<TempAbsenceHisItem> getHistoryItemBySpecifyingHistoryID(String hisID);
	/** [5] 履歴IDと枠NOを指定して履歴項目を取得する	 **/													
	List<TempAbsenceHisItem> specifyHisAndFrameNotGetHisItem(List<String> lstHisId, List<TempAbsenceFrameNo> tempAbsenceFrNo);
	/**[6] 年月日時点の履歴項目を取得する **/
	List<TempAbsenceHisItem> getHisItemsAsOfDate(String companyId , GeneralDate date);
	/** [7-1] 社員を指定して年月日時点の履歴項目を取得する ( 会社ID, 年月日, 社員ID ) **/
	Optional<TempAbsenceHisItem> getEmpAndHistoryItem(String companyId,String empID ,GeneralDate ymd ); 
	/** [7-2] *社員を指定して年月日時点の履歴項目を取得する ( 会社ID, 年月日, List<社員ID> ) **/
	List<TempAbsenceHisItem> getListEmpAndHistoryItem(String companyId,List<String> empIDs ,GeneralDate ymd ); 
	/** [8-1] 期間付き履歴項目を取得する **/
	List<TimeoffLeaveRecordWithPeriod> getHistoryItemWithPeriod (String companyID, List<String> lstEmpId , DatePeriod datePeriod , List<TempAbsenceFrameNo> lstTempAbsenceFrameNo);
	/** [8-2] 期間付き休職履歴項目を取得する**/
	List<TimeoffLeaveRecordWithPeriod> getLeaveHistoryItemsWithPeriod (String companyID , List<String> lstEmpId,DatePeriod datePeriod );
	/** [8-3] 期間付き休業履歴項目を取得する **/
	List<TimeoffLeaveRecordWithPeriod> getAbsenceHistoryItemPeriod (String companyId , List<String> lstEmpId ,DatePeriod datePeriod);
}
