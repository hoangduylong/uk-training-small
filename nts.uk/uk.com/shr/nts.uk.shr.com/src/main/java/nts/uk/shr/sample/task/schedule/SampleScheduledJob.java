package nts.uk.shr.sample.task.schedule;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.Value;
import lombok.val;
import nts.uk.shr.com.communicate.PathToWebApi;
import nts.uk.shr.com.communicate.batch.BatchServer;
import nts.uk.shr.com.task.schedule.ExecutionContext;
import nts.uk.shr.com.task.schedule.UkScheduledJob;

@Stateless
public class SampleScheduledJob extends UkScheduledJob {
	
	@Inject
	private SampleJobService service;
	
	@Inject
	private BatchServer batchServer;

	@Override
	protected void execute(ExecutionContext context) {
		
		if (this.batchServer.exists()) {
			val webApi = this.batchServer.webApi(PathToWebApi.at("/webapi/batch/sample"), SampleRequest.class);
			this.batchServer.request(webApi, c -> c
						.entity(new SampleRequest("hello"))
						.succeeded(x -> {
							
						}));
			
		} else {
			this.service.doSomething(
					context.runtimeData(),
					context.scheduletimeData().getString("TEST"));
		}
	}

	@Value
	public static class SampleRequest {
		private final String value;
	}
}
