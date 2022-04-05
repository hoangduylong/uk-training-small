package nts.uk.ctx.bs.employee.dom.employment.history;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

public interface EmploymentHistoryRepository {
	
	/**
	 * Get employment history by employee id
	 * @param sid
	 * @return
	 */
	Optional<EmploymentHistory> getByEmployeeId(String cid, String sid);
	
	/**
	 * Get employment history by employee id with descending
	 * @param cid
	 * @param sid
	 * @return
	 */
	Optional<EmploymentHistory> getByEmployeeIdDesc(String cid, String sid);
	
	/**
	 * get with employeeId
	 * startDate <= standardDate <= endDate 
	 * @param employeeId
	 * @param standardDate
	 * @return
	 */
	Optional<DateHistoryItem> getByEmployeeIdAndStandardDate(String employeeId, GeneralDate standardDate);
	
	/**
	 * get with historyId
	 * @param historyId
	 * @return
	 */
	Optional<DateHistoryItem> getByHistoryId(String historyId);
	
	/**
	 * Add employment history
	 * @param sid
	 * @param domain
	 */
	void add(String sid, DateHistoryItem domain);
	
	/**
	 * Update employment history
	 * @param itemToBeUpdated
	 */
	void update(DateHistoryItem itemToBeUpdated);
	
	/**
	 * Delete employment history
	 * @param histId
	 */
	void delete(String histId);
	
	// query from RequestList 264
	List<EmploymentHistory> getByListSid(List<String> employeeIds  ,  DatePeriod datePeriod);
	
	// RequestList 640
	List<EmploymentHistory> getByListHistId(List<String> histIds);
	
	
	/**
	 * @author lanlt
	 * getEmploymentHistoryItem
	 * @param historyId
	 * @param employmentCode
	 * @return
	 */
	Optional<EmploymentHistory> getEmploymentHistory(String historyId, String employmentCode);
	/**
	 * @author hoatt
	 * get with employeeId
	 * startDate <= standardDate <= endDate 
	 * @param employeeId
	 * @param standardDate
	 * @return
	 */
	Map<String, DateHistItem> getBySIdAndate(List<String> lstSID, GeneralDate standardDate);
	
	List<Object[]>  getEmploymentBasicInfo(String employmentCode, DatePeriod birthdayPeriod, GeneralDate baseDate,
			String cid);
	
	// query from RequestList 640
	List<EmploymentHistoryItem> getEmploymentHisItem(List<String> employeeIds, DatePeriod baseDatePeriod);

	/**
	 * @author lanlt
	 * get list Employee by sids, cid, standar
	 * @param cid
	 * @param sids
	 * @param standardDate
	 * @return
	 */
	List<DateHistoryItem> getByEmployeeIdAndStandardDate(String cid, List<String> sids, GeneralDate standardDate);
	/**
	 * @author lanlt
	 * get list Employee by sids, cid, standar
	 * @param cid
	 * @param sids
	 * @param standardDate
	 * @return
	 */
	List<DateHistoryItem> getByEmployeeIdAndNoStandardDate(String cid, List<String> sids );
	

	/**
	 * @author lanlt
	 * get all by cid and sids
	 * @param cid
	 * @param sids
	 * @return
	 */
	List<EmploymentHistory> getAllByCidAndSids(String cid, List<String> sids);
	
	/**
	 * @author lanlt
	 * addAll EmploymentHistory
	 * @param employmentHistories
	 */
	void addAll(List<EmploymentHistory> employmentHistories);
	
	/**
	 * addAll dateHistoryItems
	 * @param employmentHists
	 */
	
	void addAll(Map<String, DateHistoryItem> employmentHists);
	/**
	 * Update all employment history
	 * @param itemToBeUpdateds
	 */
	void updateAll(List<DateHistoryItem> itemToBeUpdateds);
	
    
    /**
     * get with employeeId
     * startDate <= standardDate <= endDate 
     * @param employeeId
     * @param standardDate
     * @return
     */
    List<DateHistoryItem> getByEmployeeId(String employeeId);
    /**
     * [0] insert ( 雇用履歴, 雇用履歴項目 )
     * @param employmentHistory
     * @param employmentHistoryItem
     */
	void insert(EmploymentHistory employmentHistory , EmploymentHistoryItem employmentHistoryItem );
	/**
	 * [1] update ( 雇用履歴, 雇用履歴項目 )
	 * @param employmentHistory
	 * @param employmentHistoryItem
	 */
	void update(EmploymentHistory employmentHistory , EmploymentHistoryItem employmentHistoryItem );
	/**
	 * [2-1] delete ( 会社ID, 社員ID, 履歴ID )
	 * @param companyId
	 * @param empId
	 * @param histId
	 */
	void delete (String companyId , String empId , String histId);
	/**
	 * [2-2] delete ( 会社ID, 社員ID )
	 * @param companyId
	 * @param empId
	 */
	void delete (String companyId , String empId);
	/**
	 * [3-1] 社員IDを指定して履歴を取得する ( 会社ID, 社員ID )
	 * @param companyId
	 * @param empId
	 * @return
	 */
	Optional<EmploymentHistory> getByCidAndEmpID(String companyId , String empId);
	/**
	 * [3-2] *社員IDを指定して履歴を取得する ( 会社ID, List<社員ID> )
	 * @param companyId
	 * @param empId
	 * @return
	 */
	List<EmploymentHistory> getByCidAndListEmpID(String companyId , List<String> empIds);
	/**
	 * [4-1] 履歴IDを指定して履歴項目を取得する ( 履歴ID )
	 * @param histId
	 * @return
	 */
	Optional<EmploymentHistoryItem> getEmploymentHistoryItem(String histId);
	/**
	 * [4-2] *履歴IDを指定して履歴項目を取得する ( List<履歴ID> )
	 * @param listHistId
	 * @return
	 */
	List<EmploymentHistoryItem> getAllEmploymentHistoryItem(List<String> listHistId);
	/**
	 * [5] 年月日時点の履歴項目を取得する
	 * @param companyId
	 * @param ymd
	 * @return
	 */
	List<EmploymentHistoryItem> getEmploymentHistoryItemByDate(String companyId , GeneralDate ymd);
	/**
	 * [6-1] 社員を指定して年月日時点の履歴項目を取得する ( 会社ID, 年月日, 社員ID )
	 * @param companyId
	 * @param ymd
	 * @param empId
	 * @return
	 */
	Optional<EmploymentHistoryItem> getByEmpIdAndDate (String companyId ,GeneralDate ymd, String empId);
	/**
	 * [6-2] *社員を指定して年月日時点の履歴項目を取得する ( 会社ID, 年月日, List<社員ID> )
	 * @param companyId
	 * @param ymd
	 * @param listEmpId
	 * @return
	 */
	List<EmploymentHistoryItem> getByListEmpIdAndDate (String companyId ,GeneralDate ymd, List<String> listEmpId);
	/**
	 * [7] 期間付き履歴項目を取得する
	 * @param companyId
	 * @param lstEmpId
	 * @param ymd
	 * @return
	 */
	List<EmploymentHistoryTerm> getEmploymentHistoryTerm (String companyId , List<String> lstEmpId , DatePeriod datePeriod ); 
	
}
