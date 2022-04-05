package nts.uk.ctx.bs.employee.dom.employee.history;

import java.util.List;
import java.util.Map;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

public interface AffCompanyHistRepository {
	/** add new affiliation history */
	/**[0] insert ( 所属会社履歴 ) **/
	void add(AffCompanyHist domain);
	/** [1] update ( 所属会社履歴 ) **/
	/** update one affiliation history */
	void update(AffCompanyHist domain);
	
	/** remove all affiliation history of one person */
	void remove(AffCompanyHist domain);

	/** remove one affiliation by personId & employeeId */
	void remove(String pId, String employeeId, String hisId);

	/** remove affiliation history of one employee */
	void remove(String pId, String employeeId);
	
	/** remove all affiliation history of one person */
	/**[2] delete ( 個人ID )	**/
	void remove(String pId);
	/**[3-1] 社員IDを指定して履歴を取得する ( 社員ID ) **/
	AffCompanyHist getAffCompanyHistoryOfPerson(String personId);

	AffCompanyHist getAffCompanyHistoryOfEmployee(String employeeId);
	
	AffCompanyHist getAffCompanyHistoryOfEmployeeDesc(String cid, String employeeId);
	
	/**
	 * đối ứng cho thuật toán [次回特休情報を取得する]
	 * @param cid
	 * @param sids
	 * @return
	 */
	Map<String, AffCompanyHist> getAffCompanyHistoryOfEmployee(String cid, List<String> sids);
	
	List<AffCompanyHist> getAffCompanyHistoryOfEmployees(List<String> employeeIds);
	/**[3-2] *社員IDを指定して履歴を取得する ( List<社員ID> )**/
	/**
	 * return AffCompanyHistByEmployee
	 * @param employeeIds
	 * @return
	 */
	List<AffCompanyHistByEmployee> getAffEmployeeHistory(List<String> employeeIds);
	
	List<AffCompanyHistByEmployee> getAffEmployeeHistory(List<String> employeeIds , DatePeriod datePeriod);

	AffCompanyHist getAffCompanyHistoryOfEmployeeAndBaseDate(String employeeId, GeneralDate baseDate);

	List<AffCompanyHist> getAffCompanyHistoryOfEmployeeListAndBaseDate(List<String> employeeIds, GeneralDate baseDate);
	
	AffCompanyHist getAffCompanyHistoryOfHistInfo(String histId);

	/** Hop.NT */

	/** Add new affiliation history */
	void add(String sid, String pId, AffCompanyHistItem item);

	/** Update one affiliation history */
	void update(AffCompanyHistItem item);

	/** End */
	
	List<AffCompanyHist> getAffComHisEmpByLstSidAndPeriod(List<String> employeeIds, DatePeriod datePeriod);
	
	List<String> getLstSidByLstSidAndPeriod(List<String> employeeIds, DatePeriod datePeriod);
	
	/**
	 * @author lanlt
	 * @param employeeIds
	 * @param baseDate
	 * @return
	 */
	List<AffCompanyHist> getAffComHistOfEmployeeListAndBaseDateV2(List<String> employeeIds, GeneralDate baseDate);
	/**
	 * @author lanlt
	 * add new affiliation histories  
	 * @param domains
	 */
	void addAll(List<AffCompanyHistCustom> domains);
	/**
	 * @author lanlt
	 * update all AffCompanyHistItems
	 * @param items
	 */
	void updateAll(List<AffCompanyHistItem> items);

	// get data cps013
	List<AffCompanyHist> getAffComHistOfEmployeeListAndNoBaseDateV3(List<String> sids);
	/** [4] 期間を指定して社員ID付き履歴項目を取得する **/
	List<CompanyWithEmployeeID> getHistoryItemByEmpID(List<String> lstEmpId , DatePeriod datePeriod);
}
