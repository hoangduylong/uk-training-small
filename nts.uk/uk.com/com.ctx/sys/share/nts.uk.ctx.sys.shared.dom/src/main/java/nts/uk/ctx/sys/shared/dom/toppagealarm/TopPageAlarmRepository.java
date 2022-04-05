package nts.uk.ctx.sys.shared.dom.toppagealarm;

import java.util.List;

public interface TopPageAlarmRepository {
	/**
	 * find all toppage
	 * @param companyId
	 * @param managerId
	 * @param rogerFlag
	 * @return
	 */
	List<TopPageAlarm> findAllToppage(String companyId, String managerId, int month);
	
	/**
	 * find top page alarm
	 * @param executionLogId
	 * @return
	 * @author yennth
	 */
	List<TopPageAlarm> findToppage(String companyId, String managerId, int rogerFlag, int month);
	/**
	 * find top page alarm detail
	 * @return
	 * @author yennth
	 */
	List<TopPageAlarmDetail> findDetail(String executionLogId);
	
	void updateRoger(String executionLogId, int rogerFlag);
	
	void insertTopPage(String executionLogId, String managerId, int executionContent, int isCancelled, int existenceError);
	
	void insertDetail(TopPageAlarmDetail domain);
	
	List<TopPageAlarm> findByExecutionContent(String companyId, int executionContent);
}
