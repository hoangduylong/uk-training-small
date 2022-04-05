package nts.uk.ctx.sys.portal.ws.pginfomation;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.query.pginfomation.PGInfomationDto;
import nts.uk.ctx.sys.portal.app.query.pginfomation.PGInfomationQueryFinder;

@Path("sys/portal/pginfomation")
@Produces("application/json")
public class PGInfomationWebService extends WebService {

	@Inject
	private PGInfomationQueryFinder pgInfomationQueryFinder;

	@POST
	@Path("findBySystem/{systemType}")
	public List<PGInfomationDto> findBySystem(@PathParam("systemType") int systemType) {
		return pgInfomationQueryFinder.findBySystem(systemType);
	}

}
