package nts.uk.ctx.bs.person.ws.person.personal.anniversary;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import command.person.personal.BrowsePersonalAnniversarieCommand;
import command.person.personal.BrowsePersonalAnniversarieCommandHandler;
import nts.arc.layer.ws.WebService;

@Path("ctx/bs/person/personal/anniversary")
@Produces("application/json")
public class AnniversaryWebService extends WebService {
	
	@Inject
	private BrowsePersonalAnniversarieCommandHandler commandHandler;
	
	@POST
	@Path("/updateAnnivesaryNotice")
	public void updateAnnivesartNotice(BrowsePersonalAnniversarieCommand command) {
		this.commandHandler.handle(command);
	}
}
