/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ws.workplace.config.info;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.find.workplace.config.dto.WkpConfigInfoFindObject;
import nts.uk.ctx.bs.employee.app.find.workplace.config.dto.WorkplaceHierarchyDto;
import nts.uk.ctx.bs.employee.app.find.workplace.config.info.WorkplaceConfigInfoFinder;

/**
 * The Class WorkplaceConfigInfoWebService.
 */
@Path("bs/employee/workplace/config/info")
@Produces(MediaType.APPLICATION_JSON)
public class WorkplaceConfigInfoWebService extends WebService {

	/** The wkp config info finder. */
	@Inject
	private WorkplaceConfigInfoFinder wkpConfigInfoFinder;

	/**
	 * Find all by start date.
	 *
	 * @param findObject
	 *            the find object
	 * @return the list
	 */
	@Path("find")
	@POST
	public List<WorkplaceHierarchyDto> findAllByStartDate(WkpConfigInfoFindObject findObject) {
		return this.wkpConfigInfoFinder.findAllByStartDate(findObject.getBaseDate());
	}

	/**
	 * Find all by base date.
	 *
	 * @param findObject
	 *            the find object
	 * @return the list
	 */
	@Path("findAll")
	@POST
	public List<WorkplaceHierarchyDto> findAllByBaseDate(WkpConfigInfoFindObject findObject) {		
		return this.wkpConfigInfoFinder.findAllByBaseDate(findObject);
	}
	
	@Path("findAllForKcp")
	@POST
	public List<WorkplaceHierarchyDto> findAllByBaseDateForKcp010(WkpConfigInfoFindObject findObject) {
		if(findObject.getSystemType() == null) {
			findObject.setSystemType(2);
		}
		
		return this.wkpConfigInfoFinder.findAllByBaseDateForKcp010(findObject);
	}

}
