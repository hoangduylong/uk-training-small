package nts.uk.shr.sample.asyncmd;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.arc.task.AsyncTaskInfo;

@Path("/sample/asynccmd")
@Produces("application/json")
public class SampleAsyncCmmandWebService extends WebService {

	@Inject
	private SampleCancellableAsyncCommandHandler handler;
	
	@POST
	@Path("test")
	public AsyncTaskInfo test() {
		return this.handler.handle(new SampleCancellableAsyncCommand());
	}
}
