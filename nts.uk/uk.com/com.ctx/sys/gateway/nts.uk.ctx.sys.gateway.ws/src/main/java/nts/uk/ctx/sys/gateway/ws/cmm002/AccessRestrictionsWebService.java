package nts.uk.ctx.sys.gateway.ws.cmm002;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.ctx.sys.gateway.app.command.cmm002.AccessRestrictionsCommandHandler;
import nts.uk.ctx.sys.gateway.app.command.cmm002.AllowedIPAddressAddCommand;
import nts.uk.ctx.sys.gateway.app.command.cmm002.AllowedIPAddressDeleteCommand;
import nts.uk.ctx.sys.gateway.app.command.cmm002.AllowedIPAddressUpdateCommand;

@Path("com/ctx/sys/gateway/accessrestrictions")
@Produces("application/json")
public class AccessRestrictionsWebService {

	@Inject
	private AccessRestrictionsCommandHandler commandHandler;
	
	@POST
	@Path("add")
	public void add(AllowedIPAddressAddCommand command) {
		commandHandler.addAllowdIpAddress(command);
	}
	
	@POST
	@Path("update")
	public void update(AllowedIPAddressUpdateCommand command) {
		commandHandler.updateAllowdIpAddress(command);
	}
	
	@POST
	@Path("del")
	public void delete(AllowedIPAddressDeleteCommand command) {
		commandHandler.deleteAllowdIpAddress(command);
	}
}
