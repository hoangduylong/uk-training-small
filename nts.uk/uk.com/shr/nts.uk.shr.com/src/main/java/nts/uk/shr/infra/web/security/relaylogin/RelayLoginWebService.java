package nts.uk.shr.infra.web.security.relaylogin;

import javax.enterprise.inject.spi.CDI;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import lombok.Value;
import lombok.val;
import nts.arc.security.ticket.DataTicket;
import nts.uk.shr.com.security.AuthenticateContract;
import nts.uk.shr.com.security.SetupLoginUserContext;
import nts.uk.shr.com.security.SetupLoginUserContext.UserNotFoundException;

@Path("shr/security/relaylogin")
public class RelayLoginWebService {

	@POST
	@Path("authenticate")
	@Produces("application/json")
	public RelayLoginResult authenticate(RelayLoginParameter parameter) {
		
		val ticket = DataTicket.restore(parameter.getTicket());
		RelayLoginInfo relayInfo = ticket.getData();
		
		boolean isValidContract = CDI.current().select(AuthenticateContract.class).get().authenticate(
				parameter.getContractCode(), parameter.getContractPassword());
		
		if (!isValidContract) {
			return RelayLoginResult.failed();
		}
		
		try {
			CDI.current().select(SetupLoginUserContext.class).get().setup(
					parameter.getContractCode(),
					relayInfo.getCompanyId(),
					relayInfo.getUserId());
		} catch (UserNotFoundException e) {
			throw new RuntimeException("user not found: " + relayInfo.getUserId());
		}
		
		return RelayLoginResult.succeeded(relayInfo.getPathToJump());
	}
	
	@Value
	public static class RelayLoginParameter {
		private final String ticket;
		private final String contractCode;
		private final String contractPassword;
	}
	
	@Value
	public static class RelayLoginResult {
		private final boolean isSucceeded;
		private final String pathToJump;
		
		public static RelayLoginResult succeeded(String pathToJump) {
			return new RelayLoginResult(true, pathToJump);
		}

		public static RelayLoginResult failed() {
			return new RelayLoginResult(false, null);
		}
	}
}
