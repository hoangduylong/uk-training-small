package nts.uk.ctx.sys.portal.ws.generalsearch;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.screenquery.generalsearch.GeneralSearchHistoryScreenQuery;

@Path("sys/portal/generalsearch")
@Produces("application/json")
public class WebGeneralSearchService extends WebService {

	@Inject
	private GeneralSearchHistoryScreenQuery screenQuery;
	
	/**
	 * Can search.
	 * マニュアル検索できる
	 * @return true, if successful
	 */
	@POST
	@Path("/check-search-manual")
	public boolean canSearch() {
		return this.screenQuery.canSearch();
	}
}
