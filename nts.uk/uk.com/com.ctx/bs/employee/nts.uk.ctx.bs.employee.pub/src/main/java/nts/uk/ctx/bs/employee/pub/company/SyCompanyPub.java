package nts.uk.ctx.bs.employee.pub.company;

import java.util.List;

import nts.arc.layer.app.cache.CacheCarrier;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

public interface SyCompanyPub {
	
	/**
	 * RequestList No.211
	 * @param sid
	 * @param datePeriod
	 * @return
	 */
	List<AffCompanyHistExport> GetAffCompanyHistByEmployee(List<String> sid, DatePeriod datePeriod);
	List<AffCompanyHistExport> GetAffCompanyHistByEmployeeRequire(CacheCarrier cacheCarrier, List<String> sids, DatePeriod datePeriod);
	
	/**
	 * Get Company history by sid and base date
	 * @param sid
	 * @param baseDate
	 * @return
	 */
	
	AffCompanyHistExport GetAffComHisBySidAndBaseDate(String sid, GeneralDate baseDate);
	
	/**
	 * Get Company history by sid
	 * @param cid
	 * @param sid
	 * @return
	 */
	
	AffCompanyHistExport GetAffComHisBySid(String cid, String sid);
	
	/**
	 * RequestList 588
	 * 社員の指定期間中の所属期間を取得する
	 * @param sid
	 * @param datePeriod
	 * @return
	 */
	List<StatusOfEmployee> GetListAffComHistByListSidAndPeriod(List<String> sid, DatePeriod datePeriod);
	
	/**
	 * đối ứng cho cps003
	 * @param cid
	 * @param sid
	 * @return
	 */
	List<AffCompanyHistExport> getAffComHisBySids(String cid, List<String> sids);
}