/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.ws.company;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.basic.app.find.company.beginningmonth.BeginningMonthDto;
import nts.uk.ctx.basic.app.find.company.beginningmonth.BeginningMonthFinder;

/**
 * The Class BeginningMonthWs.
 */
@Path("basic/company/beginningmonth")
@Produces("application/json")
public class BeginningMonthWs extends WebService {

	/** The finder. */
	@Inject
	private BeginningMonthFinder finder;

	/**
	 * Find.
	 *
	 * @return the beginning month dto
	 */
	@POST
	@Path("find")
	public BeginningMonthDto find() {
		return this.finder.find();
	}

}
