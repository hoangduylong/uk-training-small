package nts.uk.ctx.sys.auth.ws.grant.rolesetjob;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.auth.app.command.grant.rolesetjob.RegisterRoleSetGrantedJobTitleCommandHandler;
import nts.uk.ctx.sys.auth.app.command.grant.rolesetjob.RoleSetGrantedJobTitleCommand;
import nts.uk.ctx.sys.auth.app.find.grant.rolesetjob.GrantRoleSetJobDto;
import nts.uk.ctx.sys.auth.app.find.grant.rolesetjob.ReferenceDateDto;
import nts.uk.ctx.sys.auth.app.find.grant.rolesetjob.RoleSetGrantedJobTitleFinder;

/**
 * 
 * @author HungTT
 *
 */

@Path("ctx/sys/auth/grant/rolesetjob")
@Produces("application/json")
public class RoleSetGrantedJobTitleWebService extends WebService {

	@Inject
	private RoleSetGrantedJobTitleFinder finder;
	
	@Inject
	private RegisterRoleSetGrantedJobTitleCommandHandler handler;
	
	@POST
	@Path("start")
	public GrantRoleSetJobDto start(ReferenceDateDto refDate){
		return this.finder.getAllData(refDate.getRefDate()); 
	}
	
	@POST
	@Path("register")
	public void register(RoleSetGrantedJobTitleCommand command){
		this.handler.handle(command);
	}
	
}
