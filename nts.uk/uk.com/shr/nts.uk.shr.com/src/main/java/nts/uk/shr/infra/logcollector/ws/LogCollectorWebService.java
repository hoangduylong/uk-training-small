package nts.uk.shr.infra.logcollector.ws;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import nts.arc.layer.ws.WebService;
import nts.arc.task.AsyncTaskInfo;
import nts.uk.shr.infra.logcollector.app.LogReadRequest;
import nts.uk.shr.infra.logcollector.app.LogReaderServiceCommandHandler;

@Path("/logcollector")
public class LogCollectorWebService extends WebService {

	@Inject
	private LogReaderServiceCommandHandler logHandler;

	/**
	 * Extract log.
	 * 
	 * @param time
	 * @return task result
	 */
	@POST
	@Path("/extract")
	public AsyncTaskInfo extract(LogReadRequest request) {
		return logHandler.handle(request);
	}

}
