/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.service;

import java.util.List;

import nts.uk.ctx.bs.employee.dom.employee.service.dto.EmployeeSearchData;
import nts.uk.ctx.bs.employee.dom.employee.service.dto.EmployeeSearchDto;

/**
 * The Interface SearchEmployeeService.
 */
public interface SearchEmployeeService {
	
	/**
	 * Search by code.
	 *
	 * @param dto the dto
	 * @return the employee search data
	 */
	EmployeeSearchData searchByCode(EmployeeSearchDto dto);
	
	
	List<EmpBasicInfo> getEmpBasicInfo(List<String> lstSid);
	
	
	
}
