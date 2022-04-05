package nts.uk.ctx.sys.log.dom.pereg;

import java.util.List;

import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 
 * @author vuongnv
 * 
 */
public interface IPersonInfoCorrectionLogRepository {
	List<PersonInfoCorrectionLog> findByTargetAndDate(String operationId, List<String> listEmployeeId,
			DatePeriod period);
	
	List<PersonInfoCorrectionLog> findByTargetAndDate(List<String> operationIds, List<String> listEmployeeId,
			DatePeriod period);

	List<PersonInfoCorrectionLog> findByTargetAndDateRefactors(List<String> operationId, List<String> listEmployeeId,
			DatePeriod period, int offset, int limit);
	
	List<PersonInfoCorrectionLog> findByTargetAndDate(List<String> operationId, List<String> listEmployeeId);
	
	/**
	 * CLI003: fix bug #108979 OFFSET " + offset + " ROWSFETCH FIRST " + limit + " ROWS ONLY
	 * OFFSET " + offset + " ROWS"
	 * FETCH FIRST " + limit + " ROWS ONLY
	 * this.getEntity().createQuery(sql).setFirstResult(offset)
	 * setMaxResults(limit)
	 * @param operationId
	 * @param listEmployeeId
	 * @param offset
	 * @param limit
	 * @return
	 */
	List<PersonInfoCorrectionLog> findByTargetAndDateRefactors(List<String> operationId, List<String> listEmployeeId, int offset, int limit);
	
	/**
	 * CLI003: fix bug #108872
	 * EA修正履歴No3675
	 * @param operationId
	 * @param listEmployeeId
	 * @return
	 */
	List<PersonInfoCorrectionLog> findByTargetAndDateScreenF(List<String> operationId, List<String> listEmployeeId);
	
	void save(List<PersonInfoCorrectionLog> correctionLogs);
}
