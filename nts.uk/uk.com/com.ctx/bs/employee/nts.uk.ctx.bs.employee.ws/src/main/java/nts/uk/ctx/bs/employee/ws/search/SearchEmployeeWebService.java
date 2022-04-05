package nts.uk.ctx.bs.employee.ws.search;

/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.dom.employee.service.SearchEmployeeService;
import nts.uk.ctx.bs.employee.dom.employee.service.dto.EmployeeSearchData;
import nts.uk.ctx.bs.employee.dom.employee.service.dto.EmployeeSearchDto;

/**
 * The Class SearchEmployeeWebService.
 */
@Path("screen/com/kcp009")
@Produces("application/json")
public class SearchEmployeeWebService extends WebService {
	
	/** The search employee service. */
	@Inject
	private SearchEmployeeService searchEmployeeService;
	
	/**
	 * Search employee.
	 *
	 * @param dto the dto
	 * @return the employee search data
	 */
	@POST
	@Path("employeesearch/")
	public EmployeeSearchData searchEmployee(EmployeeSearchDto dto) {
		return this.searchEmployeeService.searchByCode(dto);
	}
}
