package nts.uk.ctx.sys.portal.ws.webmenu.webmenulinking;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.uk.ctx.sys.portal.app.find.webmenu.webmenulinking.RoleByRoleTiesDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.webmenulinking.RoleByRoleTiesFinder;

@Path("sys/portal/webmenu/webmenulinking")
@Produces("application/json")
public class RoleByRoleTiesWebService {
	@Inject
	private RoleByRoleTiesFinder roleByRoleTiesFinder;
	
	@POST
	@Path("getrolebyroletiesbyid/{roleId}")
	public RoleByRoleTiesDto getRoleByRoleTiesByid(@PathParam("roleId")String roleId) {
		RoleByRoleTiesDto data = this.roleByRoleTiesFinder.getRoleByRoleTiesByid(roleId);
		return data;
	}
}
