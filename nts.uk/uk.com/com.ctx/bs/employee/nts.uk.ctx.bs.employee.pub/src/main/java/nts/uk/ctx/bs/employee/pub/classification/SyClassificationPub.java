/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.classification;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import nts.arc.layer.app.cache.CacheCarrier;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface WorkplacePub.
 */
public interface SyClassificationPub {

	/**
	 * Find S job hist by sid.
	 *
	 * @param employeeId the employee id
	 * @param baseDate the base date
	 * @return the optional
	 */
	// RequestList32
	Optional<SClsHistExport> findSClsHistBySid(String companyId, String employeeId, GeneralDate baseDate);

	/**
	 * Find S cls hist by sid.
	 *
	 * @param companyId the company id
	 * @param employeeId the employee id
	 * @param datePeriod the date period
	 * @return the optional
	 */
	// RequestList32-3
	List<SClsHistExport> findSClsHistBySid(String companyId, List<String> employeeIds, DatePeriod datePeriod);
	List<SClsHistExport> findSClsHistBySidRequire(CacheCarrier cacheCarrier, String companyId, List<String> employeeIds,DatePeriod datePeriod); 
	
	/**
	 * Gets the classification map.
	 *
	 * @param companyId the company id
	 * @param clsCds the cls cds
	 * @return the classification map
	 */
	Map<String, String> getClassificationMapCodeName(String companyId, List<String> clsCds);

	// for salary qmm016, 017
	List<ClassificationExport> getClassificationByCompanyId(String companyId);
	
	/**
	 * Get data cho ben HR
	 * @param baseDate
	 * @param listempID
	 * @return
	 */
	List<AffCompanyHistItemExport> getByIDAndBasedate(GeneralDate baseDate , List<String> listempID);
	
	// Dùng cho bên ksu001
	List<EmpClassifiExport> getByListSIDAndBasedate(GeneralDate baseDate , List<String> listempID);
	
}
