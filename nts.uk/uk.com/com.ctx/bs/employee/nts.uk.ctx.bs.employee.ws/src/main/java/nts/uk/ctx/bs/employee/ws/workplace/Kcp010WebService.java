/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ws.workplace;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.app.find.workplace.dto.InputSerarchKcp010;
import nts.uk.ctx.bs.employee.app.find.workplace.dto.Kcp010WorkplaceSearchData;
import nts.uk.ctx.bs.employee.app.find.workplace.info.Kcp010Finder;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class Kcp010WebService.
 */
@Path("screen/com/kcp010")
@Produces("application/json")
public class Kcp010WebService extends WebService {
	
	/** The query processor. */
	@Inject
	private Kcp010Finder finder;
	
	@POST
	@Path("search")
	public Kcp010WorkplaceSearchData searchWorkplace(InputSerarchKcp010 inputSerarchKcp010 ) {
		
		return this.finder.searchByWorkplaceCode(inputSerarchKcp010.getWorkplaceCode(), inputSerarchKcp010.getBaseDate()).get();
	}
	
	@POST
	@Path("getLoginWkp")
	public Kcp010WorkplaceSearchData getWorkplaceBySid() {
		if(this.finder.findBySid(AppContexts.user().employeeId(), GeneralDate.today()).isPresent()) {
			return this.finder.findBySid(AppContexts.user().employeeId(), GeneralDate.today()).get();
		} else {
			return null;
		}
	}
	
	@POST
	@Path("getLoginWorkPlace")
	public Kcp010WorkplaceSearchData getLoginWorkPlace() {
		if(this.finder.findBySid(AppContexts.user().employeeId(), GeneralDate.today()).isPresent()) {
			return this.finder.findBySid(AppContexts.user().employeeId(), GeneralDate.today()).get();
		} else {
			return null;
		}
	}
}
