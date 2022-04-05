/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ws.employment;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.find.employment.EmploymentHistoryItemFinder;
import nts.uk.ctx.bs.employee.app.find.employment.dto.EmploymentHistoryItemDto;

/**
 * The Class EmploymentHistoryWebService.
 */
@Path("bs/employee/employment/history")
@Produces(MediaType.APPLICATION_JSON)
public class EmploymentHistoryWebService extends WebService {

	/** The emp his finder. */
	@Inject
	private EmploymentHistoryItemFinder empHisFinder;

	/**
	 * Gets the current history item.
	 *
	 * @return the current history item
	 */
	@POST
	@Path("getcurrenthistoryitem")
	public EmploymentHistoryItemDto getCurrentHistoryItem() {
		return this.empHisFinder.findCurrentHistoryItem();
	}

}
