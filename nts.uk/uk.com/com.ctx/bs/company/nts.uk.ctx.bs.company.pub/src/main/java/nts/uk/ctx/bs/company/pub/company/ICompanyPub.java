package nts.uk.ctx.bs.company.pub.company;

import java.util.List;
import java.util.Optional;

import nts.arc.layer.app.cache.CacheCarrier;
import nts.arc.time.YearMonth;
import nts.arc.time.calendar.period.YearMonthPeriod;

public interface ICompanyPub {

	/**
	 * for request list No.51
	 * 
	 * @return List Company
	 */

	List<CompanyExport> getAllCompany();
	
	/**
	 * for request list No.51
	 * 
	 * @return List Company
	 */

	List<CompanyExport> getAllCompanyByContract(String contractCode);

	/**
	 * for request list No.108
	 * 
	 * @return Company Info
	 */

	BeginOfMonthExport getBeginOfMonth(String cid);
	BeginOfMonthExport getBeginOfMonthRequire(CacheCarrier cacheCarrier,String cid);


	/**
	 * for request list No.125
	 * 
	 * @return Company Info
	 */

	CompanyExport getCompanyByCid(String cid);
	
	/**
	 * For RequestList289
	 * 
	 * @param companyId
	 * @param contractCd
	 * @return
	 */
	List<String> acquireAllCompany();
	/** RequestList No58 **/
	List<CompanyExport> getAllCompanyInfor();
	
	/**
	 * Get Company By cid
	 * @param cid
	 * @return
	 */
	CompanyExport getCompany(String cid);
	/**
	 * get list company
	 * @param 廃止区分 isAbolition
	 * @param 契約CD contractCd
	 * @return
	 */
	List<CompanyExport> getLstComByContractAbo(String contractCd, int isAbolition);
	
	
	/**
	 * [RQ622]会社IDから会社情報を取得する
	 * @param cid
	 * @return
	 */
	Optional<CompanyExport622> getCompanyNotAbolitionByCid(String cid);
	
	/**
	 * Contract code,  
	 * abolition classification = not abolished
	 * màn KDP003 sử dụng
	 * @return
	 */
	List<CompanyExportForKDP003> get(String contractCd, Optional<String> cid,Boolean isAbolition);
	
	/**
	 * Create CompanyId.
	 *
	 * @param companyCode
	 * @param tenantCode
	 * @return String
	 */
	String createCompanyId(String companyCode, String tenantCode);
	
	YearMonthPeriod getyearMonth(String cid, int year);
	
	//暦の年月から年月期間を作成する
	public Optional<YearMonthPeriod> getYearMonthPeriodByCalendarYearmonth(String cid, YearMonth yearMonth);
}
