/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employment;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.app.find.employment.dto.EmploymentDto;
import nts.uk.ctx.bs.employee.app.find.employment.dto.GroupCommonMasterImport;

/**
 * The Interface EmploymentFinder.
 */
public interface EmploymentFinder {
	
	/**
	 * Find by code.
	 *
	 * @param code the code
	 * @return the employment dto
	 */
	EmploymentDto findByCode(String code);
	
	/**
	 * Find all.
	 *
	 * @return the list
	 */
	List<EmploymentDto> findAll();
	
	/**
	 * Find by codes.
	 *
	 * @param code the code
	 * @return the list
	 */
	List<EmploymentDto> findByCodes(List<String> empCodes);
	
	/**
	 * Find by codes with null.
	 *
	 * @param code the code
	 * @return the list
	 * */

	List<EmploymentDto> findByCodesWithNull(List<String> empCodes);
	
	
	GroupCommonMasterImport findGroupCommonMaster();

	
	// dung để test reqList
	List<DataEmployeeExport> getEmployeeInfo(List<String> listSIdParam, GeneralDate baseDate);
	
	// dung để test reqList
	List<EmploymentInfoExport> getEmploymentInfo(String cid, Optional<Boolean> getEmploymentNameParam,
			Optional<Boolean> getEmpExternalCodeParam, Optional<Boolean> getMemoParam,
			Optional<Boolean> getempCommonMasterIDParam, Optional<Boolean> getempCommonMasterItemIDParam);

	// dung để test reqList
	List<EmployeeBasicInfoExport> getEmploymentBasicInfo(List<ObjectParam> listObjParam, GeneralDate baseDate, String cid);
}
