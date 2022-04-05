/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import nts.arc.layer.app.cache.CacheCarrier;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface WorkplacePub.
 */
public interface SyEmploymentPub {

	/**
	 * Find S job hist by sid.
	 *
	 * @param employeeId the employee id
	 * @param baseDate the base date
	 * @return the optional
	 */
	// RequestList31
	Optional<SEmpHistExport> findSEmpHistBySid(String employeeId, GeneralDate baseDate);
	Optional<SEmpHistExport> findSEmpHistBySid(String companyId, String employeeId, GeneralDate baseDate);
	Optional<SEmpHistExport> findSEmpHistBySidRequire(CacheCarrier cacheCarrier, String companyId, String employeeId,GeneralDate baseDate);

    /**
     * Find S job hist by sid.
     *
     * @param employeeId the employee id
     * @param baseDate the base date
     * @return the optional
     */
    //giống RQ 31 nhưng là truyền vào SID
    List<SEmpHistExport> findSEmpHistBySid(String companyId, String employeeId);

	/**
	 * Find all.
	 *
	 * @param companyId the company id
	 * @return the list
	 */
	// RequestList89
	List<EmpCdNameExport> findAll(String companyId);
	
	/**
	 * Find by emp codes.
	 *
	 * @param companyId the company id
	 * @param empCodes the emp codes
	 * @return the list
	 */
	List<ShEmploymentExport> findByEmpCodes(String companyId, List<String> empCodes);
	
	/** 
	 * Find by List Sids and Period
	 * @param sids
	 * @param period
	 * @return
	 */
	//RequestList264
	List<EmploymentHisExport> findByListSidAndPeriod(List<String> sids , DatePeriod datePeriod);
	
	/**
	 * Gets the emp hist by sid and period.
	 *
	 * @param sids the sids
	 * @param datePeriod the date period
	 * @return the emp hist by sid and period
	 */
	// RequestList31-3
	// 社員ID（List）と指定期間から社員の雇用履歴を取得
	List<AffPeriodEmpCdHistExport> getEmpHistBySidAndPeriod(List<String> sids , DatePeriod datePeriod);
	List<AffPeriodEmpCdHistExport> getEmpHistBySidAndPeriodRequire(CacheCarrier cacheCarrier, List<String> sids , DatePeriod datePeriod);
	
	/**
	 * Gets the employment map.
	 *
	 * @param companyId the company id
	 * @param empCodes the emp codes
	 * @return the employment map
	 */
	Map<String, String> getEmploymentMapCodeName(String companyId, List<String> empCodes);
	// RequestList31 - ver2
	Map<String, SEmpHistExport> findSEmpHistBySidVer2(String companyId, List<String> lstSID, GeneralDate baseDate);
	
	
	/**
	 * RequestList638 [RQ638]雇用と期間からその期間に生年月日がある社員を取得する
	 * @param listObjParam  List＜雇用コード、誕生日期間＞
	 * @param baseDate 基準日
	 * @param cid  会社ID
	 */
	List<EmployeeBasicInfoExport> getEmploymentBasicInfo(List<ObjectParam> listObjParam, GeneralDate baseDate, String cid);


	/**
	 * RequestList639 [RQ639]会社ID、取得したい情報パラメータから雇用情報を取得する.
	 * @param cid 会社ID
	 * @param getEmploymentName （Option）雇用名称を取得する（Defalt = true）
	 * @param getEmpExternalCode （Option）雇用外部コードを取得する（Defalt = false）
	 * @param getMemo （Option）メモを取得する（Defalt = false）
	 * @param getempCommonMasterID （Option）グループ会社共通マスタIDを取得する（Defalt = false）
	 * @param getempCommonMasterItemID （Option）グループ会社共通マスタ項目IDを取得する（Defalt = false）
	 */
	List<EmploymentInfoExport> getEmploymentInfo(String cid, Optional<Boolean> getEmploymentName,Optional<Boolean> getEmpExternalCode,
			Optional<Boolean> getMemo,Optional<Boolean> getempCommonMasterID,Optional<Boolean> getempCommonMasterItemID);

	/**
	 * RequestList640 [RQ640]社員ID(List)と基準日から個人IDと雇用を合わせて取得する
	 * @param listSId : List<社員ID>
	 * @param baseDatePeriod : 期間
	 */
	List<DataEmployeeExport> getEmployeeInfo(List<String> listSId , GeneralDate baseDate);

}