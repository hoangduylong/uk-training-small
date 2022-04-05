/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.classification.affiliate;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * @author danpv
 * @author hop.nt
 *
 */
public interface AffClassHistoryRepository {
	
	/**
	 * return historyDomain with one period
	 * @param historyId
	 * @return
	 */
	Optional<DateHistoryItem> getByHistoryId(String historyId);
	
	/**
	 * get with employeeId and standardDate
	 * @param employeeId
	 * @param standardDate
	 * @return
	 */
	Optional<DateHistoryItem> getByEmpIdAndStandardDate(String employeeId, GeneralDate standardDate);
	
	/**
	 * return historyDomain with periods
	 * @param employeeId
	 * @return
	 */
	Optional<AffClassHistory> getByEmployeeId(String cid, String employeeId);
	
	/**
	 * return historyDomain with periods descending
	 * @param cid
	 * @param employeeId
	 * @return
	 */
	Optional<AffClassHistory> getByEmployeeIdDesc(String cid, String employeeId);
	
	/**
	 * request-list 398
	 * @param employeeIds
	 * @param period
	 * @return
	 */
	List<AffClassHistory> getByEmployeeListWithPeriod(List<String> employeeIds, DatePeriod period);
	
	/**
	 * add domain history
	 * @param history
	 * @author hop.nt
	 */
	void add(String cid, String sid, DateHistoryItem itemToBeAdded);
	
	/**
	 * update domain history
	 * @param history
	 * @author hop.nt
	 */
	void update(DateHistoryItem item);
	
	/**
	 * delete domain history
	 * @param histId
	 * @author hop.nt
	 */
	void delete(String histId);
	
	/**
	 * get DateHistoryItem theo công ty , list sid, standardDate, mục đích viết response cho màn cps003
	 * @param cid
	 * @param employeeIds
	 * @param standardDate
	 * @author lanlt
	 */
	List<DateHistoryItem> getByEmployeeListWithPeriod(String cid, List<String> employeeIds, GeneralDate standardDate);
	
	/**
	 * get DateHistoryItem theo công ty , list sid, mục đích viết response cho màn cps003 (gọi từ add command)
	 * @param cid
	 * @param employeeIds
	 * @param standardDate
	 * @author lanlt
	 */
	List<AffClassHistory> getBySidsWithCid(String cid, List<String> sids);
	
	
	/**
	 * add domain history
	 * @param history
	 * @author lanlt
	 */
	void addAll(List<AffClassHistory> domains);
	
	/**
	 * update domain history
	 * @param history
	 * @author lanlt
	 */
	void updateAll(List<DateHistoryItem> domains);

	List<DateHistoryItem> getByEmployeeListNoWithPeriod(String cid, List<String> employeeIds );
	
	List<AffClassHistory> getHistoryByEmployeeListWithBaseDate(String cid, List<String> employeeIds, GeneralDate standardDate);
}
