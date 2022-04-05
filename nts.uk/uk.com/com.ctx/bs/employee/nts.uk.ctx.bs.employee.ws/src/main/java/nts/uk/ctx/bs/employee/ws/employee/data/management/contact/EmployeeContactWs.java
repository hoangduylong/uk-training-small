package nts.uk.ctx.bs.employee.ws.employee.data.management.contact;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.employee.data.management.ContactCommand;
import nts.uk.ctx.bs.employee.app.command.employee.data.management.ContactCommandHandler;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("ctx/bs/employee/data/management/contact")
@Produces("application/json")
public class EmployeeContactWs  extends WebService {

    @Inject
    private ContactCommandHandler handler;

    @Path("update")
    @POST
    public void updateAccount(ContactCommand command) {
        handler.handle(command);
    }

}
