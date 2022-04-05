package nts.uk.shr.infra.query.hint;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("query/hint")
@Produces("application/json")
public class QueryHintWebService {
	
	@POST
	@Path("setting/get")
	public QueryHintConfig get() {
		return QueryHintConfig.currentSetting();
	}
	
	@POST
	@Path("setting/update")
	public void update(QueryHintConfig setting) {
		setting.apply();
	}
}
