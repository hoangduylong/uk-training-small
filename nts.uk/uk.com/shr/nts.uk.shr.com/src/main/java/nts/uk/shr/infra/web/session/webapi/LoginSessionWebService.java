package nts.uk.shr.infra.web.session.webapi;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import lombok.val;
import nts.arc.layer.app.command.JavaTypeResult;
import nts.arc.security.ticket.DataTicket;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager;

@Path("/shr/web/session")
public class LoginSessionWebService {
	
	@Inject
	private LoginUserContextManager contextManager;

	@POST
	@Path("serialize")
	public JavaTypeResult<String> serialize() {
		return new JavaTypeResult<>(this.contextManager.toTicket().serialize());
	}
	
	@POST
	@Path("restore")
	public void restore(String serializedTicket) {
		val ticket = DataTicket.restore(serializedTicket);
		this.contextManager.restore(ticket);
	}
	
	@POST
	@Path("logout")
	public void logout() {
		this.contextManager.loggedOut();
	}
}
