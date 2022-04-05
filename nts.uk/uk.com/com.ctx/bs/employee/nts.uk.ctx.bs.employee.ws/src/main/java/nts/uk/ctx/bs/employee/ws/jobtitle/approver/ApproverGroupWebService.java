package nts.uk.ctx.bs.employee.ws.jobtitle.approver;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.uk.ctx.bs.employee.app.command.jobtitle.approver.ApproverGroupAddAllCommandHandler;
import nts.uk.ctx.bs.employee.app.command.jobtitle.approver.ApproverGroupAddCommandHandler;
import nts.uk.ctx.bs.employee.app.command.jobtitle.approver.ApproverGroupCommand;
import nts.uk.ctx.bs.employee.app.command.jobtitle.approver.ApproverGroupDelCommandHandler;
import nts.uk.ctx.bs.employee.app.command.jobtitle.approver.ApproverGroupUpdCommandHandler;
import nts.uk.ctx.bs.employee.app.find.jobtitle.approver.ApproverGroupDto;
import nts.uk.ctx.bs.employee.app.find.jobtitle.approver.ApproverGroupFinder;

@Path("bs/employee/approver/group")
@Produces(MediaType.APPLICATION_JSON)
public class ApproverGroupWebService {
	
	@Inject
	private ApproverGroupFinder approverGroupFinder;
	
	@Inject
	private ApproverGroupAddCommandHandler approverGroupAddCommandHandler;
	
	@Inject
	private ApproverGroupUpdCommandHandler approverGroupUpdCommandHandler;
	
	@Inject
	private ApproverGroupDelCommandHandler approverGroupDelCommandHandler;
	
	@Inject
	private ApproverGroupAddAllCommandHandler approverGroupAddAllCommandHandler;
	
	@POST
	@Path("findAll")
	public List<ApproverGroupDto> findAll() {
		return approverGroupFinder.findAll();
	}
	
	@POST
	@Path("register")
	public void register(ApproverGroupCommand command) {
		approverGroupAddCommandHandler.handle(command);
	}
	
	@POST
	@Path("update")
	public void update(ApproverGroupCommand command) {
		approverGroupUpdCommandHandler.handle(command);
	}
	
	@POST
	@Path("delete")
	public void delete(ApproverGroupCommand command) {
		approverGroupDelCommandHandler.handle(command);
	}
	
	@POST
	@Path("multiInsert")
	public void register(List<ApproverGroupCommand> commandLst) {
		approverGroupAddAllCommandHandler.handle(commandLst);
	}
	
}
