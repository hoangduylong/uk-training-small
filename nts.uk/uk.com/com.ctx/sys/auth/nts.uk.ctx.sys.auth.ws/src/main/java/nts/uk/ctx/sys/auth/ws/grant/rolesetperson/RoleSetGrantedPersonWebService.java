package nts.uk.ctx.sys.auth.ws.grant.rolesetperson;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.uk.ctx.sys.auth.app.command.grant.rolesetperson.DeleteRoleSetGrantedPersonCommandHandler;
import nts.uk.ctx.sys.auth.app.command.grant.rolesetperson.RegisterRoleSetGrantedPersonCommandHandler;
import nts.uk.ctx.sys.auth.app.command.grant.rolesetperson.RoleSetGrantedPersonCommand;
import nts.uk.ctx.sys.auth.app.find.grant.rolesetjob.RoleSetDto;
import nts.uk.ctx.sys.auth.app.find.grant.rolesetperson.RoleSetGrantedPersonDto;
import nts.uk.ctx.sys.auth.app.find.grant.rolesetperson.RoleSetGrantedPersonFinder;
import nts.uk.ctx.sys.auth.dom.employee.dto.EmployeeImport;

/**
 * 
 * @author HungTT
 *
 */

@Path("ctx/sys/auth/grant/rolesetperson")
@Produces("application/json")
public class RoleSetGrantedPersonWebService {
	@Inject
	private RoleSetGrantedPersonFinder finder;

	@Inject
	private RegisterRoleSetGrantedPersonCommandHandler regHandler;
	
	@Inject
	private DeleteRoleSetGrantedPersonCommandHandler delHandler;

	@POST
	@Path("allroleset")
	public List<RoleSetDto> start() {
		return this.finder.getAllRoleSet();
	}

	@POST
	@Path("register")
	public void register(RoleSetGrantedPersonCommand command) {
		this.regHandler.handle(command);
	}
	
	@POST
	@Path("delete")
	public void delete(RoleSetGrantedPersonCommand command) {
		this.delHandler.handle(command);
	}

	@POST
	@Path("selectroleset/{code}")
	public List<RoleSetGrantedPersonDto> selectRoleSet(@PathParam("code") String code) {
		return this.finder.getAllRoleSetGrantedPersonByRoleSetCd(code);
	}
	
	@POST
	@Path("getempinfo/{id}")
	public EmployeeImport getEmployeeInfo(@PathParam("id") String id) {
		return this.finder.getEmployeeInfo(id);
	}
}
