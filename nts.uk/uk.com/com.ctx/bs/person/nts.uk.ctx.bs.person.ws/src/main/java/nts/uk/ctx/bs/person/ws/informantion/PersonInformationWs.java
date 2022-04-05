package nts.uk.ctx.bs.person.ws.informantion;
import command.person.personal.PersonalCommand;
import command.person.personal.PersonalCommandHandler;
import nts.arc.layer.ws.WebService;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("ctx/bs/person/personal/information")
@Produces("application/json")
public class PersonInformationWs  extends WebService {

    @Inject
    private PersonalCommandHandler handler;

    @Path("update")
    @POST
    public void updateAccount(PersonalCommand command) {
        handler.handle(command);
    }

}
