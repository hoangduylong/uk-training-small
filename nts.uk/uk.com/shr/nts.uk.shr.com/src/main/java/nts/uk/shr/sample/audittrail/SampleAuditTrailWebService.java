package nts.uk.shr.sample.audittrail;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.shr.sample.audittrail.correction.SampleCorrectionLogCommand;
import nts.uk.shr.sample.audittrail.correction.SampleCorrectionLogCommandHandler;

@Path("/sample/audit")
@Produces("application/json")
public class SampleAuditTrailWebService {
	
	@Inject
	private SampleCorrectionLogCommandHandler commandHandler;
	
	@POST
	@Path("test")
	public void test() {
		
		this.commandHandler.handle(new SampleCorrectionLogCommand());
		
	}
}
