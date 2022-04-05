package nts.uk.shr.com.security.audittrail.start;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;

public interface StartPageLogRepository {

	Optional<StartPageLog> find(String operationId);

	List<StartPageLog> find(List<String> operationIds);
	
	List<StartPageLog> finds(String companyId);
	
	List<StartPageLog> finds(GeneralDate targetDate);
	
	List<StartPageLog> finds(DatePeriod targetDate);
	
	List<StartPageLog> findBySid(String sId);
	
	List<StartPageLog> findBySid(List<String> sIds);
	
	List<StartPageLog> findBy(String companyId, List<String> listEmployeeId,
			GeneralDateTime start, GeneralDateTime end, int offset, int limit);
	/**
	 * CLI003: fix bug #108872
	 * EA修正履歴No3675
	 * @param companyId
	 * @param listEmployeeId
	 * @param start
	 * @param end
	 * @return
	 */
	List<StartPageLog> findByScreenF(String companyId, List<String> listEmployeeId,
			GeneralDateTime start, GeneralDateTime end);
	
	/**
	 * CLI003: fix bug #108979 OFFSET " + offset + " ROWSFETCH FIRST " + limit + " ROWS ONLY
	 * OFFSET " + offset + " ROWS"
	 * FETCH FIRST " + limit + " ROWS ONLY
	 * this.getEntity().createQuery(sql).setFirstResult(offset)
	 * setMaxResults(limit)
	 * @param companyId
	 * @param start
	 * @param end
	 * @param offSet
	 * @param limit
	 * @return
	 */
	
	List<StartPageLog> findBy(String companyId, GeneralDateTime start, GeneralDateTime end, int offSet, int limit);
	
	
	/**
	 * CLI003: fix bug #108873
	 * @param companyId
	 * @param start
	 * @param end
	 * @return
	 */
	List<StartPageLog> findByScreenF(String companyId, GeneralDateTime start, GeneralDateTime end);
}
