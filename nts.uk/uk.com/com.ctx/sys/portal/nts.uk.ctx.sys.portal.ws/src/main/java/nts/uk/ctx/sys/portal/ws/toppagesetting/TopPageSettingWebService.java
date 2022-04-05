package nts.uk.ctx.sys.portal.ws.toppagesetting;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.find.toppagesetting.TopPageSettingDto;
import nts.uk.ctx.sys.portal.app.find.toppagesetting.TopPageSettingFinder;

/**
 * 
 * @author sonnh1
 *
 */

@Path("sys/portal/toppagesetting")
@Produces("application/json")
public class TopPageSettingWebService extends WebService {
	@Inject
	TopPageSettingFinder topPageSettingFinder;

	@POST
	@Path("findByCId")
	public TopPageSettingDto findByCId() {
		return topPageSettingFinder.findByCId();
	}
}
