package nts.uk.shr.sample.task.schedule;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.app.command.JavaTypeResult;

@Path("/sample/schedule")
@Produces("application/json")
public class SampleScheduleWebService {
	
	@Inject
	private SampleScheduler scheduler;

	@POST
	@Path("schedule")
	public JavaTypeResult<String> schedule() {
		return new JavaTypeResult<>(this.scheduler.schedule());
	}

	@POST
	@Path("unschedule/{id}")
	public void unschedule(@PathParam("id") String scheduleId) {
		this.scheduler.unschedule(scheduleId);
	}
}
