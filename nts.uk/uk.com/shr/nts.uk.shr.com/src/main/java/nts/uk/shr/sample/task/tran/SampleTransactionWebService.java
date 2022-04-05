package nts.uk.shr.sample.task.tran;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/sample/tran")
@Produces("application/json")
public class SampleTransactionWebService {
	
	@Inject
	private SampleTransactionAppService app;
	
	@POST
	@Path("test")
	public void test() {
		this.app.test();
	}
}
