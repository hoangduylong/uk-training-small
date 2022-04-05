package nts.uk.ctx.sys.portal.ws.toppagepart;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.find.placement.PlacementPartDto;
import nts.uk.ctx.sys.portal.app.find.toppagepart.ActiveTopPagePartDto;
import nts.uk.ctx.sys.portal.app.find.toppagepart.PortalTopPagePartFinder;

/**
 * @author LamDT
 */
@Path("sys/portal/topagepart")
@Produces("application/json")
public class TopPagePartWebservice extends WebService {

	@Inject
	PortalTopPagePartFinder portalTopPagePartFinder;

	@POST
	@Path("findAll")
	public ActiveTopPagePartDto findAll(String pgType) {
		Integer data = Integer.parseInt(pgType);
		return portalTopPagePartFinder.findAll(data);
	}
	
	@POST
	@Path("findPlacementPartByID/{topPagePartID}")
	public PlacementPartDto findPlacementPartByID(@PathParam("topPagePartID") String topPagePartID) {
		return portalTopPagePartFinder.findPlacementPartByID(topPagePartID);
	}
	
}
