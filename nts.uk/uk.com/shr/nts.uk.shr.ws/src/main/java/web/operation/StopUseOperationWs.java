package web.operation;

import java.util.Optional;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.shr.com.context.loginuser.SessionLowLayer;
import nts.uk.shr.com.operation.SystemOperationSettingAdapter;

@Path("operation/stop")
@Produces("application/json")
public class StopUseOperationWs extends WebService {

	@Inject
	private SystemOperationSettingAdapter sysOperSetAdapter;
	
	@Inject
	private SessionLowLayer sessionLowLayer;

	@POST
	@Path("message")
	public OperationState getStopUseMessage() {
		Optional<String> message = sysOperSetAdapter.stopUseConfirm();
		if (message.isPresent()) {
			sessionLowLayer.loggedOut();
			return new OperationState(true, message.get());
		}
		return new OperationState(true, "");
	}

}
