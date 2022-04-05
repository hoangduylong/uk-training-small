package nts.uk.shr.sample.batchserver;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.app.command.JavaTypeResult;

@Path("sample/batch")
@Produces("application/json")
public class APServerWebService {
	
	@Inject
	private APBatchTask aPBatchTask;
	
	@POST
	@Path("ap-server")
	public JavaTypeResult<String> scheduleBatch() {
		this.aPBatchTask.execute();
		return new JavaTypeResult<>("done!");
	}
	
}
