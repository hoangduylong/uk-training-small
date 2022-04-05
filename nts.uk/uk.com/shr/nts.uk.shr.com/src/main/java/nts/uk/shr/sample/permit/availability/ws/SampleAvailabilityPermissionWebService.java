package nts.uk.shr.sample.permit.availability.ws;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.shr.com.permit.app.SaveAvailabilityPermissionCommand;
import nts.uk.shr.sample.permit.availability.app.AddOrUpdateSampleAvailabilityPermissionCommandHandler;

@Path("/sample/avail")
@Produces("application/json")
public class SampleAvailabilityPermissionWebService {

	@Inject
	private AddOrUpdateSampleAvailabilityPermissionCommandHandler commandHandler;

	@POST
	@Path("save")
	public void setValue(SaveAvailabilityPermissionCommand command) {
		this.commandHandler.handle(command);
	}
}
